import { useParams } from 'react-router-dom';
import { retrieveTodoApi, retrieveTodosApi } from '../api/TodoApiService';
import { useAuth } from '../security/AuthContext';
import { useEffect } from 'react';

function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;

  useEffect(() => retrieveTodo(), [id]);

  function retrieveTodo() {
    retrieveTodoApi(username, id)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
  return (
    <div className="TodoComponent">
      <div className="container">
        <header>
          <h1 className="display-6">Enter Todo Details</h1>
        </header>
      </div>
      <div className="w-50 mx-auto">
        <form>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="description" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoComponent;
