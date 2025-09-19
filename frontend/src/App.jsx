import { useState, useEffect } from "react";
import "./App.css";
import { TODOS_ENDPOINT, apiRequest } from "./config/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await apiRequest(TODOS_ENDPOINT);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Error fetching todos. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const addedTask = await apiRequest(TODOS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ task: newTask }),
      });
      setTasks([...tasks, addedTask]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiRequest(`${TODOS_ENDPOINT}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task");
    }
  };

  const editTask = async (id, currentText) => {
    const updatedText = prompt("Edit task:", currentText);
    if (!updatedText?.trim()) return;

    try {
      const updatedTask = await apiRequest(`${TODOS_ENDPOINT}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ task: updatedText }),
      });
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error updating task");
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "done" : "pending";

    try {
      const updatedTask = await apiRequest(`${TODOS_ENDPOINT}/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating status:", error);
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
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} disabled={loading}>Add</button>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ol>
            {tasks.length === 0 ? (
              <li>No tasks yet. Add one above!</li>
            ) : (
              tasks.map((task) => (
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
              ))
            )}
          </ol>
        )}
      </div>
    </div>
  );
}

export default App;