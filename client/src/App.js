import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import Attendance from './Attendance';
import Grades from './Grades';
import Sidebar from './Sidebar'; 
import './App.css';

// Mock login component for MVP
const Login = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Mock login logic
    if (username === "admin" && password === "admin123") {
      setRole("admin");
    } else if (username === "teacher" && password === "teacher123") {
      setRole("teacher");
  } else if (username === "student" && password === "student123") {
    setRole("student");
  
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// Protect route component
const ProtectedRoute = ({ children, allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const [role, setRole] = useState(null); // Store user role
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    setRole(null); // Reset the role to null to log out
  };

  return (
    <div className={`app-container ${collapsed ? 'collapsed' : ''}`}>
      <Router>
        {role ? (
          <>
            <Sidebar collapsed={collapsed} handleToggle={handleToggle} />
            <main className="content-container">
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
              <Routes>
                <Route
                  path="/students"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "teacher"]} userRole={role}>
                      <Students />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teachers"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]} userRole={role}>
                      <Teachers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/classes"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "teacher"]} userRole={role}>
                      <Classes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "teacher"]} userRole={role}>
                      <Attendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/grades"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "teacher", "student"]} userRole={role}>
                      <Grades />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </>
        ) : (
          <Login setRole={setRole} />
        )}
      </Router>
    </div>
  );
}

export default App;
