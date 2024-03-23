import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const retrieveHelloWorld = () =>
  apiClient.get('/hello-world');

export const retrieveHelloWorldBean = () =>
  apiClient.get('/hello-world-bean');

export const retrieveHelloWorldBeanPathVariable = username =>
  apiClient.get(`/hello-world/path-variable/${username}`);
