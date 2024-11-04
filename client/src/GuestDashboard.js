// GuestDashboard.js
import React from 'react';
import StudentList from './StudentList';
import ClassList from './ClassList';
import TeacherList from './TeacherList';
import GradeList from './GradeList';
import EventList from './EventList';

function GuestDashboard() {
  return (
    <div>
      <h1>Guest Dashboard</h1>
      <p>Welcome, Guest! You have limited access to view information.</p>

      <h2>Students</h2>
      <StudentList />

      <h2>Classes</h2>
      <ClassList />

      <h2>Teachers</h2>
      <TeacherList />

      <h2>Grades</h2>
      <GradeList />

      <h2>Events</h2>
      <EventList />
    </div>
  );
}

export default GuestDashboard;
