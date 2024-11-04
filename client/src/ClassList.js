import React, { useEffect, useState } from 'react';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error("Error fetching classes:", error));
  }, []);

  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {classes.map(cls => (
          <li key={cls.id}>
            {cls.name} - Teacher ID: {cls.teacher_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
