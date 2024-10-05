import React, { useState, useEffect } from 'react';
import './Students.css';
import Modal from './Modal';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', grade: '' });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
        setLoading(true); // Start loading

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
                setShowModal(false); // Close modal after successful submission
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                setErrorMessage('Error adding student');
                setTimeout(() => setErrorMessage(''), 3000);
                console.error('Error adding student:', error);
            })
            .finally(() => setLoading(false)); // End loading
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

            {/* Button to open modal */}
            <button onClick={() => setShowModal(true)}>Add Student</button>

            {/* Modal for adding new student */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Student'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Students;
