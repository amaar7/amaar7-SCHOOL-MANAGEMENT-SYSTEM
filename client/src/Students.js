import React, { useState, useEffect } from 'react';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', grade: '' });

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

        fetch('http://localhost:5000/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
        })
            .then(response => response.json())
            .then(data => {
                setStudents([...students, data]);
                setNewStudent({ name: '', grade: '' });
            })
            .catch(error => console.error('Error adding student:', error));
    };

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.name} (Grade: {student.grade})</li>
                ))}
            </ul>
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
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default Students;
