import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

import attendanceIcon from './assets/attendance.png';
import classesIcon from './assets/classes.png';
import gradeIcon from './assets/grade.png';
import studentIcon from './assets/student.svg';
import teacherIcon from './assets/teacher.png';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <h3>School Management</h3>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/students">
            <img src={studentIcon} alt="Students" className="icon" />
            <span>Students</span>
          </Link>
        </li>
        <li>
          <Link to="/teachers">
            <img src={teacherIcon} alt="Teachers" className="icon" />
            <span>Teachers</span>
          </Link>
        </li>
        <li>
          <Link to="/classes">
            <img src={classesIcon} alt="Classes" className="icon" />
            <span>Classes</span>
          </Link>
        </li>
        <li>
          <Link to="/attendance">
            <img src={attendanceIcon} alt="Attendance" className="icon" />
            <span>Attendance</span>
          </Link>
        </li>
        <li>
          <Link to="/grades">
            <img src={gradeIcon} alt="Grades" className="icon" />
            <span>Grades</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
