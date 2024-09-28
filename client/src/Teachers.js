import React, { useState, useEffect } from 'react';

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');

    useEffect(() => {
        // Fetch teachers on component mount
        fetch('http://localhost:5000/teachers')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching teachers:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTeacher = { name, subject };

        fetch('http://localhost:5000/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTeacher),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Teacher added:', data);
                setTeachers([...teachers, newTeacher]);
                setName('');
                setSubject('');
            })
            .catch(error => console.error('Error adding teacher:', error));
    };

    return (
        <div>
            <h2>Teachers List</h2>
            <ul>
                {teachers.map(teacher => (
                    <li key={teacher.id}>
                        {teacher.name} - {teacher.subject}
                    </li>
                ))}
            </ul>

            <h2>Add a New Teacher</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Teacher Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                />
                <button type="submit">Add Teacher</button>
            </form>
        </div>
    );
}

export default Teachers;
