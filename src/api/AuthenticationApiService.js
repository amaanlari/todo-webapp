import { apiClient } from './ApiClient';

export const executeBasicAuthenticationService = basicAuthenticationToken =>
  apiClient.get('/basicauth', {
    headers: {
      Authorization: basicAuthenticationToken,
    },
  });

export const executeJwtAuthenticationService = (username, password) =>
  apiClient.post('/authenticate', {
    username,
    password,
  });
