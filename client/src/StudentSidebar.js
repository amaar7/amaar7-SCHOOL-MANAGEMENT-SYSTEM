import React, { useState } from 'react';
import './Dashboard.css';

const StudentSidebar = ({ onSectionSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? '' : 'close'}`}>
      <div className="logo">
        <i className="fab fa-trade-federation"></i>
        <span className="logo-name">School Ms</span>
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
          <button onClick={() => onSectionSelect('Students')}>
            <i className="fas fa-user-graduate"></i>
            <span className="link-name">Students</span>
          </button>
        </li>

        <li>
          <button onClick={() => onSectionSelect('Classes')}>
            <i className="fas fa-chalkboard-teacher"></i>
            <span className="link-name">Classes</span>
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

export default StudentSidebar;
