import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

// Get all todos
export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new todo
export const addTodo = async (task) => {
  const response = await axios.post(API_URL, { task });
  return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};