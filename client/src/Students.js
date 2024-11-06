// Students.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Dashboard.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', grade: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  };

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
        setModalOpen(false);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error adding student:', error);
        setIsLoading(false);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) throw new Error('Error deleting student'); // <-- Add this check
        setStudents(students.filter(student => student.id !== id));
    })
    .catch(error => console.error('Error deleting student:', error));
};

  return (
    <div className="list-container">
      <h2 className="heading">Student List</h2>
      <ul className="item-list">
        {students.map(student => (
          <li key={student.id} className="item-card">
            <div className="item-info">
              <span className="item-name">{student.name}</span>
              <span className="item-detail">Grade: {student.grade}</span>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(student.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => setModalOpen(true)}>Add New Student</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
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
