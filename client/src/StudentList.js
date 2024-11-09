import React, { useEffect, useState } from 'react';
import './ListStyles.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-heading">Students</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="item-list">
          {students.map(student => (
            <li key={student.id} className="item-card">
              <div className="item-info">
                <span className="item-name">{student.name}</span>
                <span className="item-detail">Grade: {student.grade}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
