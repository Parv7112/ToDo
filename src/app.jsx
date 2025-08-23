
import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/daygrid/main.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data.data); // assuming backend sends { data: [...] }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await createTodo({ title: task });
    setTask("");
    loadTodos();
  };

  const toggleTodo = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
    loadTodos();
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1>TaskTrack</h1>
      
      {/* Input and Task List */}
      <div>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task..."
        />
        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map((t) => (
            <li key={t._id}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t._id, t.completed)}
              />
              {t.title}
              <button onClick={() => removeTodo(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Calendar Section */}
      <h2>Calendar View</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "Task 1", date: "2025-08-23" },
          { title: "Task 2", date: "2025-08-25" },
        ]}
      />
    </div>
  );
}

export default App;
