import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';
import Attendance from './Attendance';
import Grades from './Grades';
import ClassList from './ClassList';
import EventList from './EventList';
import './Dashboard.css';

function TeacherDashboard({ handleLogout }) {
  const [selectedSection, setSelectedSection] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedSection) {
      case 'Attendance':
        return <Attendance />;
      case 'Grades':
        return <Grades />;
      case 'Classes':
        return <ClassList />;
      case 'Events':
        return <EventList />;
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome, Teacher!</h2>
            <p>Manage and view relevant information below:</p>
            <div className="actions-container">
              <div className="action-card" onClick={() => setSelectedSection('Attendance')}>
                <h3>Record Attendance</h3>
                <p>Track and record student attendance.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Grades')}>
                <h3>View & Assign Grades</h3>
                <p>Manage student grading records.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Classes')}>
                <h3>View Classes</h3>
                <p>See and manage assigned classes.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Events')}>
                <h3>View School Events</h3>
                <p>Check upcoming school events.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <TeacherSidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>Teacher Dashboard - {selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default TeacherDashboard;
