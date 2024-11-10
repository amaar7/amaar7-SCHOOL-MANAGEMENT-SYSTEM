import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import Attendance from './Attendance';
import Grades from './Grades';
import EventForm from './EventForm';
import './Dashboard.css';

function AdminDashboard({ handleLogout }) {
  const [selectedSection, setSelectedSection] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedSection) {
      case 'Students':
        return <Students />;
      case 'Teachers':
        return <Teachers />;
      case 'Classes':
        return <Classes />;
      case 'Attendance':
        return <Attendance />;
      case 'Grades':
        return <Grades />;
      case 'Events':
        return <EventForm />;
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome, Admin!</h2>
            <p>Here are some tasks you can manage:</p>
            <div className="actions-container">
              <div className="action-card" onClick={() => setSelectedSection('Students')}>
                <h3>Add & Manage Students</h3>
                <p>View, add, and manage student information.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Teachers')}>
                <h3>Add & Manage Teachers</h3>
                <p>View, add, and manage teacher profiles.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Classes')}>
                <h3>Set Up Classes</h3>
                <p>Organize classes and assign teachers.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Attendance')}>
                <h3>Record Attendance</h3>
                <p>Manage and track student attendance.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Grades')}>
                <h3>Assign Grades</h3>
                <p>Record and update student grades.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Events')}>
                <h3>Plan Events</h3>
                <p>Create and manage school events.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <AdminSidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>Admin Dashboard - {selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
