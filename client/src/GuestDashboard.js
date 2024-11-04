import React, { useState } from 'react';
import Sidebar from './Sidebar';
import StudentList from './StudentList';
import ClassList from './ClassList';
import TeacherList from './TeacherList';
import GradeList from './GradeList';
import EventList from './EventList';
import './GuestDashboard.css';

const GuestDashboard = () => {
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
        return <p>Welcome, Guest! You have limited access to view information.</p>;
    }
  };

  return (
    <div className="guest-dashboard">
      <Sidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>{selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default GuestDashboard;
