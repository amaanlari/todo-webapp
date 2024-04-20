import { createContext, useContext, useState } from 'react';
import {
  executeBasicAuthenticationService,
  executeJwtAuthenticationService,
} from '../api/AuthenticationApiService';
import { apiClient } from '../api/ApiClient';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // <<<<<<<<< Custom hook

export default function AuthProvider({ children }) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // Login function with Basic Authentication
  async function loginWithBasicAuth(username, password) {
    const basicAuthenticationToken =
      'Basic ' + window.btoa(username + ':' + password);

    const response = await executeBasicAuthenticationService(
      basicAuthenticationToken,
    );

    try {
      if (response.status == 200) {
        setUserIsAuthenticated(true);
        setUsername(username);
        setToken(basicAuthenticationToken);
        apiClient.interceptors.request.use(config => {
          config.headers.Authorization = basicAuthenticationToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  // Login function with JWT
  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password,
      );

      const jwtToken = 'Bearer ' + response.data.token;

      if (response.status == 200) {
        setUserIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        apiClient.interceptors.request.use(config => {
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setUserIsAuthenticated(false);
    setUsername(null);
    setToken(null);
    return false;
  }

  return (
    <AuthContext.Provider
      value={{ userIsAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
