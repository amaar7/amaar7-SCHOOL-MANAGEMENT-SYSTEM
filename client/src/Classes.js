import React, { useState, useEffect } from 'react';
import './Classes.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', teacher: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(response => response.json())
            .then(data => setClasses(data))
            .catch(error => console.error('Error fetching classes:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClass),
        })
            .then(response => response.json())
            .then(data => {
                setClasses([...classes, data]);
                setNewClass({ name: '', teacher: '' });
                setSuccessMessage('Class added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch(error => {
                setErrorMessage('Error adding class');
                setTimeout(() => setErrorMessage(''), 3000);
                console.error('Error adding class:', error);
            });
    };

    return (
        <div className="classes-container">
            <h2 className="heading">Class List</h2>
            <ul className="class-list">
                {classes.map(classItem => (
                    <li key={classItem.id} className="class-card">
                        <div className="class-info">
                            <span className="class-name">{classItem.name}</span>
                            <span className="class-teacher">Teacher: {classItem.teacher}</span>
                        </div>
                    </li>
                ))}
            </ul>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

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
                    name="teacher"
                    value={newClass.teacher}
                    onChange={handleInputChange}
                    placeholder="Teacher"
                    required
                />
                <button type="submit">Add Class</button>
            </form>
        </div>
    );
};

export default Classes;
