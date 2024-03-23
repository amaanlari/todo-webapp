import '../App.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldBeanPathVariable } from '../api/HelloWorldApiService';

function WelcomeComponent() {
  const { username } = useParams();
  const [ message, setMessage ] = useState(null);

  function callHelloWorldRestApi() {
    console.log('called');

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

    retrieveHelloWorldBeanPathVariable('amaanlari')
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
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
    <div className="WelcomeComponent">
      <h1>ToDo Management Application</h1>
      <h2>Welcome {username}</h2>
      <div>
        Manage your todos:{' '}
        <Link to={'/todo'}>
          <button className='btn btn-dark'>Click here</button>
        </Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call hello world Rest API.
        </button>
      </div>
      <div className='text-info'>
        <h4>{message}</h4>
      </div>
    </div>
  );
}

export default WelcomeComponent;
