import { useEffect, useState } from 'react';
import '../App.css';
import { deleteTodoApi, readTodosApi } from '../api/TodoApiService';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';

function ListToDosComponent() {
  const authContext = useAuth();
  const username = authContext.username;
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  function refreshTodos() {
    readTodosApi(username)
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

  function handleUpdate(id) {
    navigate(`/todo/${id}`);
  }
  useEffect(() => refreshTodos(), []);

  return (
    <div className="container">
      <h1>To Do List!!</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Target Date</th>
            <th>Delete</th>
            <th>Update</th>
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
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdate(todo.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center m-5">
        <button
          className="btn btn-success"
          onClick={() => navigate('/todo/-1')}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ListToDosComponent;
