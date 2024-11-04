import React, { useEffect, useState } from 'react';

const GradeList = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/grades')
      .then(response => response.json())
      .then(data => setGrades(data))
      .catch(error => console.error("Error fetching grades:", error));
  }, []);

  return (
    <div>
      <h2>Grades</h2>
      <ul>
        {grades.map(grade => (
          <li key={grade.id}>
            Student ID: {grade.student_id} - Subject: {grade.subject} - Score: {grade.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradeList;
