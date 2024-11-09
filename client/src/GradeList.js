import React, { useEffect, useState } from 'react';
import './ListStyles.css';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchGrades();
    fetchStudents();
  }, []);

  const fetchGrades = () => {
    fetch('http://localhost:5000/grades')
      .then(response => response.json())
      .then(data => setGrades(data))
      .catch(error => console.error("Error fetching grades:", error));
  };

  const fetchStudents = () => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error("Error fetching students:", error));
  };

  // Helper function to get student name by ID
  const getStudentName = (id) => {
    const student = students.find(student => student.id === id);
    return student ? student.name : 'Unknown Student';
  };

  return (
    <div className="list-container">
      <h2 className="list-heading">Grades</h2>
      <ul className="item-list">
        {grades.map(grade => (
          <li key={grade.id} className="item-card">
            <div className="item-info">
              <span className="item-name">Student: {getStudentName(grade.student_id)}</span>
              <span className="item-detail">Subject: {grade.subject} - Score: {grade.score}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradeList;
