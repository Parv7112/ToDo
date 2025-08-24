import { useState, useEffect } from "react";
import Branding from "./components/Branding";
import TopBar from "./components/TopBar";
import ViewToggle from "./components/ViewToggle";
import DateFilterBar from "./components/DateFilterBar";
import Column from "./components/Column";
import Calendar from "./components/Calendar";
import TaskModal from "./components/TaskModal";
import TaskDetailsModal from "./components/TaskDetailsModal";
import Toast from "./components/Toast";
import Login from "./components/Login";
import Register from "./components/Register";
import { generateId } from "./utils/helpers";
import { getTodos, createTodo, updateTodo, deleteTodo, isAuthenticated } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentView, setCurrentView] = useState("board");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ message: "", type: "info", show: false });
  const [showTaskModal, setShowTaskModal] = useState(false);
  
  // Authentication state
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login"); // "login" or "register"
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const showToast = (message, type = "info") => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ message: "", type: "info", show: false }), 3000);
  };

  // Authentication handlers
  const handleLogin = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.username}!`, "success");
  };

  const handleRegister = (userData) => {
    setUser(userData);
    showToast(`Welcome to TaskTrack, ${userData.username}!`, "success");
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    showToast("You have been logged out", "info");
  };

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          loadTasks();
        }
      }
      setIsAuthenticating(false);
    };

    checkAuth();
  }, []);

  // Load tasks only when user is authenticated
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getTodos();
      // Map backend data to frontend structure
      const mappedTasks = response.data.map(todo => ({
        id: todo._id, // Use backend _id as frontend id
        _id: todo._id, // Keep reference to backend _id
        title: todo.title,
        description: todo.description || "",
        completed: todo.completed || false,
        status: todo.status || (todo.completed ? "completed" : "todo"),
        createdAt: todo.createdAt || new Date().toISOString(),
        updatedAt: todo.updatedAt || new Date().toISOString(),
        dueDate: todo.dueDate || null,
        priority: todo.priority || "medium"
      }));
      setTasks(mappedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      showToast("Error loading tasks", "error");
    } finally {
      setLoading(false);
    }
  };

  // CRUD
  const addTask = async (taskData) => {
    try {
      // Map frontend data to backend structure
      const backendTask = {
        title: taskData.title,
        description: taskData.description || "",
        completed: taskData.status === "completed",
        status: taskData.status || "todo",
        priority: taskData.priority || "medium",
        dueDate: taskData.dueDate || null
      };
      
      const response = await createTodo(backendTask);
      
      // Map backend response to frontend structure
      const newTask = {
        id: response.data._id,
        _id: response.data._id,
        title: response.data.title,
        description: response.data.description || "",
        completed: response.data.completed || false,
        status: response.data.status || "todo",
        createdAt: response.data.createdAt || new Date().toISOString(),
        updatedAt: response.data.updatedAt || new Date().toISOString(),
        dueDate: response.data.dueDate || null,
        priority: response.data.priority || "medium"
      };
      
      setTasks((prev) => [...prev, newTask]);
      showToast("Task created successfully!", "success");
    } catch (error) {
      console.error("Error creating task:", error);
      showToast("Error creating task", "error");
    }
  };

  const updateTask = async (taskData) => {
    try {
      const taskId = currentTaskId;
      
      // Find the task to get the backend _id
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        showToast("Task not found", "error");
        return;
      }
      
      // Map frontend data to backend structure
      const backendTask = {
        title: taskData.title || task.title,
        description: taskData.description || task.description || "",
        completed: taskData.status === "completed",
        status: taskData.status || task.status,
        priority: taskData.priority || task.priority,
        dueDate: taskData.dueDate || task.dueDate
      };
      
      const response = await updateTodo(task._id, backendTask);
      
      // Map backend response to frontend structure
      const updatedTask = {
        id: response.data._id,
        _id: response.data._id,
        title: response.data.title,
        description: response.data.description || "",
        completed: response.data.completed || false,
        status: response.data.status || task.status,
        createdAt: response.data.createdAt || task.createdAt,
        updatedAt: response.data.updatedAt || new Date().toISOString(),
        dueDate: response.data.dueDate || null,
        priority: response.data.priority || "medium"
      };
      
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? updatedTask : t
        )
      );
      showToast("Task updated successfully!", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      showToast("Error updating task", "error");
    }
  };

  const deleteTask = async () => {
    try {
      const taskId = currentTaskId;
      
      // Find the task to get the backend _id
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        showToast("Task not found", "error");
        return;
      }
      
      await deleteTodo(task._id);
      
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setCurrentTaskId(null);
      showToast("Task deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      showToast("Error deleting task", "error");
    }
  };

  // Calendar-specific task handlers
  const handleCalendarTaskUpdate = async (taskId, taskData) => {
    try {
      // Find the task to get the backend _id
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        showToast("Task not found", "error");
        return;
      }
      
      // Map frontend data to backend structure
      const backendTask = {
        title: taskData.title || task.title,
        description: taskData.description || task.description || "",
        completed: taskData.status === "completed",
        status: taskData.status || task.status,
        priority: taskData.priority || task.priority,
        dueDate: taskData.dueDate || task.dueDate
      };
      
      const response = await updateTodo(task._id, backendTask);
      
      // Map backend response to frontend structure
      const updatedTask = {
        id: response.data._id,
        _id: response.data._id,
        title: response.data.title,
        description: response.data.description || "",
        completed: response.data.completed || false,
        status: response.data.status || task.status,
        createdAt: response.data.createdAt || task.createdAt,
        updatedAt: response.data.updatedAt || new Date().toISOString(),
        dueDate: response.data.dueDate || null,
        priority: response.data.priority || "medium"
      };
      
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? updatedTask : t
        )
      );
      showToast("Task updated successfully!", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      showToast("Error updating task", "error");
    }
  };

  const handleCalendarTaskDelete = async (taskId) => {
    try {
      // Find the task to get the backend _id
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        showToast("Task not found", "error");
        return;
      }
      
      await deleteTodo(task._id);
      
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      showToast("Task deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      showToast("Error deleting task", "error");
    }
  };

  // Drag & Drop
  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId =
      e.dataTransfer?.getData("text/taskId") ||
      e.dataTransfer?.getData("taskId") ||
      e.dataTransfer?.getData("text/plain");
    if (!taskId || !newStatus) return;

    try {
      // Find the task to get the backend _id
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        showToast("Task not found", "error");
        return;
      }
      
      // Update in backend
      const backendTask = {
        title: task.title,
        description: task.description || "",
        completed: newStatus === "completed",
        status: newStatus,
        priority: task.priority,
        dueDate: task.dueDate
      };
      
      const response = await updateTodo(task._id, backendTask);
      
      // Update in frontend
      setTasks((prev) => {
        const task = prev.find((t) => t.id === taskId);
        if (!task) return prev;

        // Reorder in same column
        if (task.status === newStatus) {
          const columnTasks = prev.filter((t) => t.status === newStatus && t.id !== taskId);
          const dropY = e.clientY;

          let insertIndex = columnTasks.findIndex((t) => {
            const elem = document.querySelector(`[data-task-id="${t.id}"]`);
            if (!elem) return false;
            const rect = elem.getBoundingClientRect();
            return dropY < rect.top + rect.height / 2;
          });

          if (insertIndex === -1) insertIndex = columnTasks.length;
          columnTasks.splice(insertIndex, 0, task);
          const otherTasks = prev.filter((t) => t.status !== newStatus);
          return [...otherTasks, ...columnTasks];
        }

        // Move to different column
        return prev.map((t) =>
          t.id === taskId ? { 
            ...t, 
            status: newStatus, 
            completed: newStatus === "completed",
            updatedAt: response.data.updatedAt || new Date().toISOString() 
          } : t
        );
      });

      showToast(`Task reordered/moved in "${newStatus}"`, "success");
    } catch (error) {
      console.error("Error updating task status:", error);
      showToast("Error updating task status", "error");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (!searchTerm ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (!selectedDate ||
        (task.dueDate &&
          new Date(task.dueDate).toDateString() === selectedDate.toDateString()))
  );

  // Show loading screen while checking authentication
  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-[var(--brand-primary)] mb-4"></i>
          <p className="text-[var(--text-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication screens if not logged in
  if (!user) {
    if (authView === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView("login")}
        />
      );
    }
    
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView("register")}
      />
    );
  }

  // Show loading screen while tasks are loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <i className="fas fa-tasks text-4xl text-[var(--brand-primary)] mb-4"></i>
          <p className="text-[var(--text-muted)]">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  // Main application UI (authenticated user)
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--brand-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--brand-secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--brand-accent)] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <Branding />
          
          <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-[var(--shadow-xl)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
            <TopBar
              setSearchTerm={setSearchTerm}
              setShowTaskModal={setShowTaskModal}
              user={user}
              onLogout={handleLogout}
            />
          </div>

          <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-[var(--shadow-lg)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
            <ViewToggle currentView={currentView} setCurrentView={setCurrentView} />
            <DateFilterBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            {currentView === "calendar" ? (
              <div className="mt-6">
                <Calendar
                  currentDate={currentDate}
                  tasks={filteredTasks}
                  setCurrentDate={setCurrentDate}
                  setSelectedDate={setSelectedDate}
                  setCurrentView={setCurrentView}
                  onUpdateTask={handleCalendarTaskUpdate}
                  onDeleteTask={handleCalendarTaskDelete}
                />
              </div>
            ) : (
              <div className="mt-6">
                <div className="board flex gap-6 overflow-x-auto pb-4" style={{ scrollBehavior: "smooth" }}>
                  {["todo", "inprogress", "review", "completed"].map((status) => (
                    <Column
                      key={status}
                      status={status}
                      title={status === "todo" ? "To-Do" : status === "inprogress" ? "In Progress" : status === "review" ? "In Review" : "Completed"}
                      tasks={filteredTasks.filter((t) => t.status === status)}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      setCurrentTaskId={setCurrentTaskId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskModal show={showTaskModal} onClose={() => setShowTaskModal(false)} onSave={addTask} />
      <TaskDetailsModal
        show={!!currentTaskId}
        task={tasks.find((t) => t.id === currentTaskId)}
        onClose={() => setCurrentTaskId(null)}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
      <Toast message={toast.message} type={toast.type} show={toast.show} />
    </div>
  );
};

export default App;