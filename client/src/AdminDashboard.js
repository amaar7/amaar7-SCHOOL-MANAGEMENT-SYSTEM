import React from 'react';
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import Attendance from './Attendance';
import Grades from './Grades';
import EventForm from './EventForm';
import EventList from './EventList';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <section>
        <h2>Students</h2>
        <Students />
      </section>

      <section>
        <h2>Teachers</h2>
        <Teachers />
      </section>

      <section>
        <h2>Classes</h2>
        <Classes />
      </section>

      <section>
        <h2>Attendance</h2>
        <Attendance />
      </section>

      <section>
        <h2>Grades</h2>
        <Grades />
      </section>

      <section>
        <h2>Events</h2>
        {/* Display the list of events */}
        <EventList />

        {/* Form to create a new event */}
        <EventForm />
      </section>
    </div>
  );
}

export default AdminDashboard;
