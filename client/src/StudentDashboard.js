import React, { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import ClassList from './ClassList';
import StudentList from './StudentList';
import EventList from './EventList';
import './Dashboard.css';

function StudentDashboard() {
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
        return <p>Welcome to the Student Dashboard!</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <StudentSidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>Student Dashboard - {selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default StudentDashboard;
