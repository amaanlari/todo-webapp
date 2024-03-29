import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import ToDoApp from './components/ToDoApp';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoApp />
  </StrictMode>,
);
