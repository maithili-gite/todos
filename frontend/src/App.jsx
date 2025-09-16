import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // fetch all
  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // add
  const addTodo = async () => {
    if (!newTask.trim()) return alert("Task cannot be empty");
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setNewTask("");
  };

  // delete
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  // mark done
  const toggleStatus = async (id, status) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status === "pending" ? "done" : "pending" }),
    });
    const data = await res.json();
    setTodos(todos.map((t) => (t._id === id ? data : t)));
  };

  // edit
  const editTodo = async (id) => {
    const newTask = prompt("Edit task:");
    if (!newTask || !newTask.trim()) return;
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    const data = await res.json();
    setTodos(todos.map((t) => (t._id === id ? data : t)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>TODO LIST</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task} - {todo.status}
            <button onClick={() => editTodo(todo._id)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            <button onClick={() => toggleStatus(todo._id, todo.status)}>
              Mark as {todo.status === "pending" ? "Done" : "Pending"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
