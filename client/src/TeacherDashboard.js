import React from 'react';
import Attendance from './Attendance';
import Grades from './Grades';

function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <Attendance />
      <Grades />
    </div>
  );
}

export default TeacherDashboard;
