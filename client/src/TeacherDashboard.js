import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar'; // Import the TeacherSidebar
import Attendance from './Attendance';
import Grades from './Grades';
import ClassList from './ClassList'; // Import ClassList
import EventList from './EventList';
import './Dashboard.css';

function TeacherDashboard() {
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
        return <p>Welcome to the Teacher Dashboard!</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <TeacherSidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>Teacher Dashboard - {selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default TeacherDashboard;
