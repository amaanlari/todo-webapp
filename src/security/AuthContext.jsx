import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // <<<<<<<<< Custom hook

export default function AuthProvider({ children }) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  function login(username, password) {
    if (username == 'in28minutes' && password == 'test123') {
      setUserIsAuthenticated(true);
      setUsername(username);
      return true;
    } else {
      setUserIsAuthenticated(false);
      setUsername(null);
      return false;
    }
  }

  function logout() {
    setUserIsAuthenticated(false);
    setUsername(null);
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
