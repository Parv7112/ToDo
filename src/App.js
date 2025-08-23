
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
import { generateId, saveTasks } from "./utils/helpers";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("taskboard-tasks")) || [];
    } catch {
      return [];
    }
  });

  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentView, setCurrentView] = useState("board");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ message: "", type: "info", show: false });
  const [showTaskModal, setShowTaskModal] = useState(false);

  const showToast = (message, type = "info") => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ message: "", type: "info", show: false }), 3000);
  };

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setCurrentTaskId(null);
        setShowTaskModal(false);
      }
      if (e.key === "n" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault?.();
        setShowTaskModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // CRUD
  const addTask = (taskData) => {
    const newTask = {
      id: generateId(),
      ...taskData,
      description: "",
      createdAt: new Date().toISOString(),
      status: "todo",
    };
    setTasks((prev) => [...prev, newTask]);
    showToast("Task created successfully!", "success");
  };

  const updateTask = (taskData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === currentTaskId
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      )
    );
    showToast("Task updated successfully!", "success");
  };

  const deleteTask = () => {
    setTasks((prev) => prev.filter((task) => task.id !== currentTaskId));
    setCurrentTaskId(null);
    showToast("Task deleted successfully!", "success");
  };

  // Drag & Drop
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId =
      e.dataTransfer?.getData("text/taskId") ||
      e.dataTransfer?.getData("taskId") ||
      e.dataTransfer?.getData("text/plain");
    if (!taskId || !newStatus) return;

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
        t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
      );
    });

    showToast(`Task reordered/moved in "${newStatus}"`, "success");
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

  return (
    <div className="p-6">
      <Branding />
      <TopBar setSearchTerm={setSearchTerm} setShowTaskModal={setShowTaskModal} />
      <ViewToggle currentView={currentView} setCurrentView={setCurrentView} />
      <DateFilterBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {currentView === "calendar" ? (
        <Calendar
          currentDate={currentDate}
          tasks={filteredTasks}
          setCurrentDate={setCurrentDate}
          setSelectedDate={setSelectedDate}
          setCurrentView={setCurrentView}
        />
      ) : (
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
      )}

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