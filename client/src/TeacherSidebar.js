import React, { useState } from 'react';
import './Dashboard.css';

const TeacherSidebar = ({ onSectionSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? '' : 'close'}`}>
      <div className="logo">
        <i className="fab fa-trade-federation"></i>
        <span className="logo-name">School Management System</span>
      </div>

      <button id="menu-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <ul className="nav-list">
        <li>
          <button onClick={() => onSectionSelect('Dashboard')}>
            <i className="fab fa-microsoft"></i>
            <span className="link-name">Dashboard</span>
          </button>
        </li>

        <li>
          <button onClick={() => onSectionSelect('Classes')}>
            <i className="fas fa-chalkboard-teacher"></i>
            <span className="link-name">Classes</span>
          </button>
        </li>

        <li>
          <button onClick={() => onSectionSelect('Attendance')}>
            <i className="fas fa-check-square"></i>
            <span className="link-name">Attendance</span>
          </button>
        </li>

        <li>
          <button onClick={() => onSectionSelect('Grades')}>
            <i className="fas fa-graduation-cap"></i>
            <span className="link-name">Grades</span>
          </button>
        </li>

        <li>
          <button onClick={() => onSectionSelect('Events')}>
            <i className="fas fa-calendar-alt"></i>
            <span className="link-name">Events</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
