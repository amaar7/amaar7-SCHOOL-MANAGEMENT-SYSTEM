import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import GuestDashboard from './GuestDashboard';
import Login from './Login';
import Register from './Register';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setRole(null);
    alert("Logged out successfully");
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              role ? (
                role === 'admin' ? <Navigate to="/admin_dashboard" /> :
                role === 'teacher' ? <Navigate to="/teacher_dashboard" /> :
                role === 'student' ? <Navigate to="/student_dashboard" /> :
                <Navigate to="/guest_dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin_dashboard" element={role === 'admin' ? <AdminDashboard handleLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/teacher_dashboard" element={role === 'teacher' ? <TeacherDashboard handleLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/student_dashboard" element={role === 'student' ? <StudentDashboard handleLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/guest_dashboard" element={role === 'guest' ? <GuestDashboard handleLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
