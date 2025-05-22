import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:8080/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post('http://localhost:8080/todos', { task });
    setTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    fetchTodos();
  };

  const summarize = async () => {
    try {
      const res = await axios.post('http://localhost:8080/summarize');
      alert(res.data);
    } catch {
      alert("Failed to summarize");
    }
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task} <button onClick={() => deleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
      <button onClick={summarize}>Summarize & Send to Slack</button>
    </div>
  );
}

export default TodoList;
