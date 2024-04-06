import { createContext, useContext, useState } from 'react';
import { executeBasicAuthenticationService } from '../api/TodoApiService';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // <<<<<<<<< Custom hook

export default function AuthProvider({ children }) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  async function login(username, password) {
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
      value={{ userIsAuthenticated, login, logout, username }}
    >
      {children}
    </AuthContext.Provider>
  );
}
