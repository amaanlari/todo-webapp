import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://todo-mwjw.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
