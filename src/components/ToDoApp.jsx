import '../App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthProvider, { useAuth } from '../security/AuthContext';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListToDosComponent from './ListToDosComponent';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import LogoutComponent from './LogoutComponent';

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.userIsAuthenticated) return children;
  return <Navigate to="/login" />;
}

export default function ToDoApp() {
  return (
    <div className="ToDoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todo"
              element={
                <AuthenticatedRoute>
                  <ListToDosComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          {/* <FooterComponent /> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
