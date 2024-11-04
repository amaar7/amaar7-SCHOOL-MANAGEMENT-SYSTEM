import React, { useEffect, useState } from 'react';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/teachers')
      .then(response => response.json())
      .then(data => setTeachers(data))
      .catch(error => console.error("Error fetching teachers:", error));
  }, []);

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            {teacher.name} - Subject: {teacher.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
