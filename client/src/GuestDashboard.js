import React, { useState } from 'react';
import Sidebar from './Sidebar';
import StudentList from './StudentList';
import ClassList from './ClassList';
import TeacherList from './TeacherList';
import GradeList from './GradeList';
import EventList from './EventList';
import './Dashboard.css';

const GuestDashboard = ({ handleLogout }) => {
  const [selectedSection, setSelectedSection] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedSection) {
      case 'Students':
        return <StudentList />;
      case 'Classes':
        return <ClassList />;
      case 'Teachers':
        return <TeacherList />;
      case 'Grades':
        return <GradeList />;
      case 'Events':
        return <EventList />;
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome, Guest!</h2>
            <p>You have limited access to view information. Explore the sections below:</p>
            <div className="actions-container">
              <div className="action-card" onClick={() => setSelectedSection('Students')}>
                <h3>View Students</h3>
                <p>See available student information.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Classes')}>
                <h3>View Classes</h3>
                <p>Check the classes offered.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Teachers')}>
                <h3>View Teachers</h3>
                <p>View profiles of our teachers.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Grades')}>
                <h3>View Grades</h3>
                <p>See student grade reports.</p>
              </div>
              <div className="action-card" onClick={() => setSelectedSection('Events')}>
                <h3>View Events</h3>
                <p>Explore upcoming school events.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <Sidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>Guest Dashboard - {selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default GuestDashboard;
