import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar'; 
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import Attendance from './Attendance';
import Grades from './Grades';
import EventForm from './EventForm';
import EventList from './EventList';
import './Dashboard.css';

function AdminDashboard() {
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
        return (
          <>
            <EventList />
            <EventForm />
          </>
        );
      default:
        return <p>Welcome to the Admin Dashboard!</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar onSectionSelect={setSelectedSection} />
      <div className="content-section">
        <h1>Admin Dashboard - {selectedSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
