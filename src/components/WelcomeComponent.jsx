import '../App.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldBeanPathVariable } from '../api/HelloWorldApiService';
import { useAuth } from '../security/AuthContext';

function WelcomeComponent() {
  const { username } = useParams();
  const [message, setMessage] = useState(null);
  const authContext = useAuth();

  function callHelloWorldRestApi() {
    console.log('called');
    console.log(authContext.token);
    /*
    retrieveHelloWorldBean()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('clean up'));
    */

    /*
    retrieveHelloWorldBean()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('clean up'));
    */

    retrieveHelloWorldBeanPathVariable(username)
      .then(response => successfulResponse(response))
      .catch(error => errorResponse(error))
      .finally(() => console.log('clean up'));
  }

  function successfulResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }

  function errorResponse(error) {
    console.log(error);
    // setMessage(error.response.data);
  }

  return (
    <div className="WelcomeComponent container">
      <div className="text-center">
        <h1>ToDo Management Application</h1>
        <h2>Welcome {username}</h2>
        <div>
          Manage your todos:{' '}
          <Link to={'/todos'}>
            <button className="btn btn-dark">Click here</button>
          </Link>
        </div>
        <div>
          <button
            className="btn btn-success m-5"
            onClick={callHelloWorldRestApi}
          >
            Call hello world Rest API.
          </button>
        </div>
        <div className="text-info">
          <h4>{message}</h4>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComponent;
