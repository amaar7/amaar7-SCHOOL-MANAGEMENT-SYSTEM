import React, { useEffect, useState } from 'react';
import './ListStyles.css';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error("Error fetching classes:", error));
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-heading">Classes</h2>
      <ul className="item-list">
        {classes.map(cls => (
          <li key={cls.id} className="item-card">
            <div className="item-info">
              <span className="item-name">{cls.name}</span>
              <span className="item-detail">Teacher ID: {cls.teacher_id}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
