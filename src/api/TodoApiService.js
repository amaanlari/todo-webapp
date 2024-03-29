import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const retrieveTodosApi = username =>
  apiClient.get(`/users/${username}/todos`);

export const deleteTodoApi = (username, todoId) =>
  apiClient.delete(`/users/${username}/todos/${todoId}`);

export const retrieveTodoApi = (username, todoId) =>
  apiClient.get(`/users/${username}/todos/${todoId}`);
