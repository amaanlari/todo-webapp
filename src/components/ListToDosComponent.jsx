import { useEffect, useState } from 'react';
import '../App.css';
import { deleteTodoApi, retrieveTodosApi } from '../api/TodoApiService';
import { useAuth } from '../security/AuthContext';

function ListToDosComponent() {
  const authContext = useAuth();
  const username = authContext.username;
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  function refreshTodos() {
    retrieveTodosApi(username)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error(error));
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id).then(() => {
      setMessage(`Successfully Deleted the task with id ${id}`);
      refreshTodos();
    });
  }

  useEffect(() => refreshTodos(), []);

  return (
    <div className="container">
      <h1>To Do List!!</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Target Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {message && (
            <tr>
              <td colSpan={8} className="alert alert-warning bg-warning-subtle">
                {message}
              </td>
            </tr>
          )}
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>{todo.done.toString()}</td>
              <td>{todo.targetDate.toString()}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListToDosComponent;
