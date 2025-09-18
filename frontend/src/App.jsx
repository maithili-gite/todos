import { useState, useEffect } from "react";
import "./App.css";

const BASE_URL = "https://todos-backend-atpy.onrender.com/todos";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTasks(data);
    } catch {
      alert("Error fetching todos");
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      });
      const addedTask = await res.json();
      setTasks([...tasks, addedTask]);
      setNewTask("");
    } catch {
      alert("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert("Error deleting task");
    }
  };

  const editTask = async (id, currentText) => {
    const updatedText = prompt("Edit task:", currentText);
    if (!updatedText?.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: updatedText }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch {
      alert("Error updating task");
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "done" : "pending";

    try {
      const res = await fetch(`${BASE_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch {
      alert("Error updating status");
    }
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>✅ TODO LIST</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ol>
          {tasks.map((task) => (
            <li key={task._id}>
              <span style={{ textDecoration: task.status === "done" ? "line-through" : "none" }}>
                {task.task || "(no title)"}
              </span>{" "}
              - {task.status}
              <div className="btn-group">
                <button onClick={() => editTask(task._id, task.task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
                <button onClick={() => toggleStatus(task)}>
                  {task.status === "pending" ? "Mark as Done" : "Undo"}
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
