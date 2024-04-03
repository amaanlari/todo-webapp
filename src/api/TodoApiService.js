import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const readTodosApi = username =>
  apiClient.get(`/users/${username}/todos`);

export const deleteTodoApi = (username, todoId) =>
  apiClient.delete(`/users/${username}/todos/${todoId}`);

export const readTodoApi = (username, todoId) =>
  apiClient.get(`/users/${username}/todos/${todoId}`);

export const updateTodoApi = todo =>
  apiClient.put(`/users/${todo.username}/todos/${todo.id}}`, todo);

export const createTodoApi = todo =>
  apiClient.post(`/users/${todo.username}/todos}`, todo);
