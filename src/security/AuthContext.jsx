import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // <<<<<<<<< Custom hook

export default function AuthProvider({ children }) {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  function login(username, password) {
    if (username == 'testuser' && password == 'test123') {
      setUserIsAuthenticated(true);
      return true;
    } else {
      setUserIsAuthenticated(false);
      return false;
    }
  }

  function logout() {
    setUserIsAuthenticated(false);
    return false;
  }

  return (
    <AuthContext.Provider value={{ userIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
