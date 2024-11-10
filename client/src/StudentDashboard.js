import React, { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import ClassList from './ClassList';
import StudentList from './StudentList';
import EventList from './EventList';
import './Dashboard.css';

function StudentDashboard({ handleLogout }) {
  const [selectedSection, setSelectedSection] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedSection) {
      case 'Students':
        return <StudentList />;
      case 'Classes':
        return <ClassList />;
      case 'Events':
        return <EventList />;
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome, Student!</h2>
            <p>Here are some actions you can take:</p>
            <div className="actions-container">
              <div className="action-card" onClick={() => setSelectedSection('Students')}>
                <h3>View Your Profile</h3>
                <p>Check and update your information.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Classes')}>
                <h3>View Classes</h3>
                <p>Explore the classes you are enrolled in.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Events')}>
                <h3>View School Events</h3>
                <p>See upcoming events and activities.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <StudentSidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>Student Dashboard - {selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default StudentDashboard;
