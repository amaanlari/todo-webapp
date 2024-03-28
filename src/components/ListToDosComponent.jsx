import { useEffect, useState } from 'react';
import '../App.css';
import { retrieveTodos } from '../api/TodoApiService';

function ListToDosComponent() {
  const [todos, setTodos] = useState([]);

  function refreshTodos() {
    retrieveTodos('in28minutes')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => refreshTodos(), []);

  return (
    <div className="container">
      <h1>To Do List!!</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Status</th>
            <th>Target Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.done.toString()}</td>
              <td>{todo.targetDate.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListToDosComponent;
