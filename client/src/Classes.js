import React, { useState, useEffect } from 'react';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', teacher_id: '' });
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        // Fetch classes and teachers from the backend
        fetch('http://localhost:5000/classes')
            .then(response => response.json())
            .then(data => setClasses(data))
            .catch(error => console.error('Error fetching classes:', error));

        fetch('http://localhost:5000/teachers')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching teachers:', error));
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
                setNewClass({ name: '', teacher_id: '' });
            })
            .catch(error => console.error('Error adding class:', error));
    };

    return (
        <div>
            <h2>Class List</h2>
            <ul>
                {classes.map(cls => (
                    <li key={cls.id}>{cls.name} - Teacher ID: {cls.teacher_id}</li>
                ))}
            </ul>

            <h2>Add New Class</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newClass.name}
                    onChange={handleInputChange}
                    placeholder="Class Name"
                    required
                />
                <select
                    name="teacher_id"
                    value={newClass.teacher_id}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Class</button>
            </form>
        </div>
    );
};

export default Classes;
