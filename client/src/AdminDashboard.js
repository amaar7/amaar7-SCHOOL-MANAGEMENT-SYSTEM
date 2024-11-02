// AdminDashboard.js
import React from 'react';
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import Attendance from './Attendance';
import Grades from './Grades';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Students />
      <Teachers />
      <Classes />
      <Attendance />
      <Grades />
    </div>
  );
}

export default AdminDashboard;
