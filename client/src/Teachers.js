import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setLoading(true);

        fetch('http://localhost:5000/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTeacher),
        })
            .then(response => response.json())
            .then(data => {
                setTeachers([...teachers, data]);
                setNewTeacher({ name: '', subject: '' });
                setLoading(false);
                setIsModalOpen(false); // Close modal on success
            })
            .catch(error => {
                console.error('Error adding teacher:', error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Teachers List</h2>
            <ul>
                {teachers.map(teacher => (
                    <li key={teacher.id}>{teacher.name} - {teacher.subject}</li>
                ))}
            </ul>
            <button onClick={() => setIsModalOpen(true)}>Add Teacher</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>Add Teacher</h3>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Teacher'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Teachers;
