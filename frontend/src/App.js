import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:8086/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const handleAddTodo = async () => {
    if (!task.trim()) return;
    try {
      await axios.post('http://localhost:8086/todos', { task });
      setTask('');
      fetchTodos();
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8086/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleSummarize = async () => {
    try {
      const res = await axios.post('http://localhost:8086/summarize');
      alert(res.data);
    } catch (err) {
      console.error('Error summarizing todos:', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h1>Todo List</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '8px 16px' }}>Add</button>
      </div>
      <ul style={{ marginTop: '20px', paddingLeft: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ listStyle: 'none', marginBottom: '10px' }}>
            {todo.task}
            <button
              onClick={() => handleDelete(todo.id)}
              style={{ marginLeft: '10px', padding: '4px 8px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleSummarize} style={{ marginTop: '20px', padding: '8px 16px' }}>
        Summarize and Send to Slack
      </button>
    </div>
  );
}

export default App;
