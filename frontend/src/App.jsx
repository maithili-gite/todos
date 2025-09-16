import { useState, useEffect } from "react";

const API_BASE =
  import.meta.env.VITE_REACT_APP_BACKEND_URL ||
  process.env.REACT_APP_BACKEND_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("❌ Error fetching todos:", err);
    }
  };

  // ✅ Add or update task
  const handleAddOrUpdate = async () => {
    if (!task.trim()) return;

    try {
      if (editingId) {
        // Update existing todo
        const res = await fetch(`${API_BASE}/todos/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task }),
        });
        const updatedTodo = await res.json();

        setTodos((prev) =>
          prev.map((t) => (t._id === editingId ? updatedTodo : t))
        );
        setEditingId(null);
      } else {
        // Add new todo
        const res = await fetch(`${API_BASE}/todos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task }),
        });
        const newTodo = await res.json();

        setTodos((prev) => [...prev, newTodo]);
      }
      setTask("");
    } catch (err) {
      console.error("❌ Error saving task:", err);
    }
  };

  // ✅ Delete todo
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Error deleting task:", err);
    }
  };

  // ✅ Toggle status (Done/Undo)
  const handleToggleStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status === "pending" ? "done" : "pending" }),
      });
      const updatedTodo = await res.json();

      setTodos((prev) =>
        prev.map((t) => (t._id === id ? updatedTodo : t))
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  // ✅ Start editing
  const handleEdit = (id, currentTask) => {
    setTask(currentTask);
    setEditingId(id);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">✅ TODO LIST</h1>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* Todo list */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span
              className={todo.status === "done" ? "line-through text-gray-500" : ""}
            >
              {todo.task || "(no title)"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(todo._id, todo.task)}
                className="bg-purple-400 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleStatus(todo._id, todo.status)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                {todo.status === "pending" ? "Mark as Done" : "Undo"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
