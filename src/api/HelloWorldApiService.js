import { apiClient } from './ApiClient';

export const retrieveHelloWorld = () => apiClient.get('/hello-world');

export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean');

export const retrieveHelloWorldBeanPathVariable = username =>
  apiClient.get(`/hello-world/path-variable/${username}`);
