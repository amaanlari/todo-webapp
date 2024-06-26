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
    console.log('username: ', username);

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
    <div className="WelcomeComponent container contain">
      <div className='text-center'>
        <h1>Task Management Application</h1>
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
            Click for greeting.
          </button>
        </div>
        <div className="text-info">
          <h4>{message}</h4>
        </div>
      </div>
      <div className='readme-container'>
        <h1 className='text-center'>Task Manager Application</h1>
        <p>
          Welcome to the Task Manager Application! This application allows you
          to manage your tasks efficiently and stay organized. With its
          user-friendly interface and powerful features, you can easily create,
          update, and delete tasks based on your needs.
        </p>
        <h3>Features:</h3>
        <ul>
          <li>Create new tasks</li>
          <li>Update existing tasks</li>
          <li>Delete tasks</li>
          <li>Mark tasks as completed</li>
          <li>Filter tasks based on status</li>
        </ul>
        <h3>Technology Used:</h3>
        <ul>
          <li>
            React.js - A popular JavaScript library for building user interfaces
          </li>
          <li>React Router - A routing library for React applications</li>
          <li>
            React Context API - A state management solution for React
            applications
          </li>
          <li>Axios - A promise-based HTTP client for making API requests</li>
          <li>
            RESTful API - Backend API for handling task management operations
          </li>
        </ul>
        <h3>Check it out</h3>
        <h5>To get started, you can use the following dummy credentials:</h5>
        <ul>
          <li>Username: dummy</li>
          <li>Password: dummy</li>
        </ul>
      </div>
    </div>
  );
}

export default WelcomeComponent;
