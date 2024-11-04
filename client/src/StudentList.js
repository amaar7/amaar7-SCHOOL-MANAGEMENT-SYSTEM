import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>Students</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              {student.name} - Grade: {student.grade}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
