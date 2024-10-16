// Students.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', grade: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    })
      .then(response => response.json())
      .then(data => {
        setStudents([...students, data]);
        setNewStudent({ name: '', grade: '' });
        setSuccessMessage('Student added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setIsLoading(false);
        setModalOpen(false);  // Close the modal after submission
      })
      .catch(error => {
        setErrorMessage('Error adding student');
        setTimeout(() => setErrorMessage(''), 3000);
        setIsLoading(false);
        console.error('Error adding student:', error);
      });
  };

  return (
    <div className="students-container">
      <h2 className="heading">Student List</h2>
      <ul className="student-list">
        {students.map(student => (
          <li key={student.id} className="student-card">
            <div className="student-info">
              <span className="student-name">{student.name}</span>
              <span className="student-grade">Grade: {student.grade}</span>
            </div>
          </li>
        ))}
      </ul>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button onClick={() => setModalOpen(true)}>Add New Student</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Add Student</h2>
        <form className="student-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            placeholder="Student Name"
            required
          />
          <input
            type="text"
            name="grade"
            value={newStudent.grade}
            onChange={handleInputChange}
            placeholder="Grade"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Students;
