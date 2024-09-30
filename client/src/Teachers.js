import React, { useState, useEffect } from 'react';
import './Teachers.css';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/teachers')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching teachers:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTeacher),
        })
            .then(response => response.json())
            .then(data => {
                setTeachers([...teachers, data]);
                setNewTeacher({ name: '', subject: '' });
                setSuccessMessage('Teacher added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                setErrorMessage('Error adding teacher');
                setTimeout(() => setErrorMessage(''), 3000);
                console.error('Error adding teacher:', error);
            });
    };

    return (
        <div className="teachers-container">
            <h2 className="heading">Teacher List</h2>
            <ul className="teacher-list">
                {teachers.map(teacher => (
                    <li key={teacher.id} className="teacher-card">
                        <div className="teacher-info">
                            <span className="teacher-name">{teacher.name}</span>
                            <span className="teacher-subject">Subject: {teacher.subject}</span>
                        </div>
                    </li>
                ))}
            </ul>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form className="teacher-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newTeacher.name}
                    onChange={handleInputChange}
                    placeholder="Teacher Name"
                    required
                />
                <input
                    type="text"
                    name="subject"
                    value={newTeacher.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                />
                <button type="submit">Add Teacher</button>
            </form>
        </div>
    );
};

export default Teachers;
