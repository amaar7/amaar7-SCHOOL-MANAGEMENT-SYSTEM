import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import GuestDashboard from './GuestDashboard';
import Login from './Login';
import Register from './Register';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [role, setRole] = useState(null); // State to manage the user's role

  const handleLogout = () => {
    setRole(null);
    alert("Logged out successfully");
  };

  return (
    <Router>
      <div>
        {/* Show logout button only if user is logged in */}
        {role && <button onClick={handleLogout}>Logout</button>}

        <Routes>
          {/* Home Route: Redirects based on role or shows login */}
          <Route
            path="/"
            element={
              role ? (
                // Redirect to the appropriate dashboard based on role
                role === 'admin' ? <Navigate to="/admin_dashboard" /> :
                role === 'teacher' ? <Navigate to="/teacher_dashboard" /> :
                role === 'student' ? <Navigate to="/student_dashboard" /> :
                <Navigate to="/guest_dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Login Route */}
          <Route path="/login" element={<Login setRole={setRole} />} />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Specific dashboard routes for each role */}
          <Route path="/admin_dashboard" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/teacher_dashboard" element={role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/" />} />
          <Route path="/student_dashboard" element={role === 'student' ? <StudentDashboard /> : <Navigate to="/" />} />
          <Route path="/guest_dashboard" element={role === 'guest' ? <GuestDashboard /> : <Navigate to="/" />} />

          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
