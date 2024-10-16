import React, { useState, useEffect } from 'react';
import Modal from './Modal';  // Reusable modal component

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', teacher: '' });
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
            .then(response => response.json())
            .then(data => {
                setClasses([...classes, data]);
                setNewClass({ name: '', teacher: '' });
                setLoading(false);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error adding class:', error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Class List</h2>
            <ul>
                {classes.map(cls => (
                    <li key={cls.id}>{cls.name} - Teacher: {cls.teacher}</li>
                ))}
            </ul>
            <button onClick={() => setIsModalOpen(true)}>Add Class</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>Add Class</h3>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Class'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Classes;
