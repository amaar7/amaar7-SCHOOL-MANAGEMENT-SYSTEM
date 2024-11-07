import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Teachers.css';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = () => {
        fetch('http://localhost:5000/teachers')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching teachers:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch('http://localhost:5000/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTeacher),
        })
            .then(response => response.json())
            .then(data => {
                setTeachers([...teachers, data]);
                setNewTeacher({ name: '', subject: '' });
                setIsModalOpen(false);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error adding teacher:', error);
                setIsLoading(false);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/teachers/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete teacher');
                }
                setTeachers(teachers.filter(teacher => teacher.id !== id));
            })
            .catch(error => console.error('Error deleting teacher:', error));
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
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(teacher.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={() => setIsModalOpen(true)}>Add New Teacher</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>Add Teacher</h3>
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
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Teacher'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Teachers;
