import React, { useState, useEffect } from 'react';
import './Classes.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', teacher: '' });

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
            })
            .catch(error => console.error('Error adding class:', error));
    };

    return (
        <div className="classes-container">
            <h2>Class List</h2>
            <ul className="class-list">
                {classes.map(cl => (
                    <li key={cl.id} className="class-card">
                        {cl.name} (Teacher: {cl.teacher})
                    </li>
                ))}
            </ul>

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
