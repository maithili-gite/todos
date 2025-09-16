import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { fetchTodos } from './api/todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };

    getTodos();
  }, []);

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;