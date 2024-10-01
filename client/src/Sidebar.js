import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

import attendanceIcon from './assets/attendance.png';
import classesIcon from './assets/classes.png';
import gradeIcon from './assets/grade.png';
import studentIcon from './assets/student.svg';
import teacherIcon from './assets/teacher.png';
import schoolIcon from './assets/school.png';

const Sidebar = ({ collapsed, handleToggle }) => {
  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <button className="toggle-btn" onClick={handleToggle}>
          {collapsed ? '→' : '←'}
        </button>
        {!collapsed && <h3>School Management</h3>}
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/students">
            <img src={studentIcon} alt="Students" className="icon" />
            {!collapsed && <span>Students</span>}
          </Link>
        </li>
        <li>
          <Link to="/teachers">
            <img src={teacherIcon} alt="Teachers" className="icon" />
            {!collapsed && <span>Teachers</span>}
          </Link>
        </li>
        <li>
          <Link to="/classes">
            <img src={classesIcon} alt="Classes" className="icon" />
            {!collapsed && <span>Classes</span>}
          </Link>
        </li>
        <li>
          <Link to="/attendance">
            <img src={attendanceIcon} alt="Attendance" className="icon" />
            {!collapsed && <span>Attendance</span>}
          </Link>
        </li>
        <li>
          <Link to="/grades">
            <img src={gradeIcon} alt="Grades" className="icon" />
            {!collapsed && <span>Grades</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
