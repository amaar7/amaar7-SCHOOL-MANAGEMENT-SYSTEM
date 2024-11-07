import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Classes.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', teacher_id: '' });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = () => {
        fetch('http://localhost:5000/classes')
            .then(response => response.json())
            .then(data => setClasses(data))
            .catch(error => console.error('Error fetching classes:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClass),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding class');
                }
                return response.json();
            })
            .then(data => {
                setClasses([...classes, data]);
                setNewClass({ name: '', teacher_id: '' });
                setLoading(false);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error adding class:', error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/classes/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting class');
                }
                setClasses(classes.filter(cls => cls.id !== id));
            })
            .catch(error => console.error('Error deleting class:', error));
    };

    return (
        <div className="classes-container">
            <h2 className="heading">Class List</h2>
            <ul className="class-list">
                {classes.map(cls => (
                    <li key={cls.id} className="class-card">
                        <div className="class-info">
                            <span className="class-name">{cls.name}</span>
                            <span className="class-teacher">Teacher ID: {cls.teacher_id}</span>
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(cls.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={() => setIsModalOpen(true)}>Add New Class</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>Add Class</h3>
                <form className="class-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={newClass.name}
                        onChange={handleInputChange}
                        placeholder="Class Name"
                        required
                    />
                    <input
                        type="text"
                        name="teacher_id"
                        value={newClass.teacher_id}
                        onChange={handleInputChange}
                        placeholder="Teacher ID"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Class'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Classes;
