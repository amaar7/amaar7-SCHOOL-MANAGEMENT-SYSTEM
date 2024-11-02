// StudentDashboard.js
import React from 'react';
import Classes from './Classes';
import Grades from './Grades';

function StudentDashboard() {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <Classes />
      <Grades />
    </div>
  );
}

export default StudentDashboard;
