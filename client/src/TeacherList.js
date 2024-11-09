import React, { useEffect, useState } from 'react';
import './ListStyles.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/teachers')
      .then(response => response.json())
      .then(data => setTeachers(data))
      .catch(error => console.error("Error fetching teachers:", error));
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-heading">Teachers</h2>
      <ul className="item-list">
        {teachers.map(teacher => (
          <li key={teacher.id} className="item-card">
            <div className="item-info">
              <span className="item-name">{teacher.name}</span>
              <span className="item-detail">Subject: {teacher.subject}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
