import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Grades.css';

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [newGrade, setNewGrade] = useState({ student_id: '', subject: '', score: '' });
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchGrades();
        fetchStudents();
    }, []);

    const fetchGrades = () => {
        fetch('http://localhost:5000/grades')
            .then(response => response.json())
            .then(data => setGrades(data))
            .catch(error => console.error('Error fetching grades:', error));
    };

    const fetchStudents = () => {
        fetch('http://localhost:5000/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGrade(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('http://localhost:5000/grades', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGrade),
        })
            .then(response => response.json())
            .then(data => {
                setGrades([...grades, data]);
                setNewGrade({ student_id: '', subject: '', score: '' });
                setLoading(false);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error adding grade:', error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/grades/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setGrades(grades.filter(grade => grade.id !== id));
            })
            .catch(error => console.error('Error deleting grade:', error));
    };

    const getStudentName = (id) => {
        const student = students.find(student => student.id === id);
        return student ? student.name : 'Unknown Student';
    };

    return (
        <div className="grades-container">
            <h2 className="heading">Grades List</h2>
            <ul className="grade-list">
                {grades.map(grade => (
                    <li key={grade.id} className="grade-card">
                        <div className="grade-info">
                            <span className="grade-student">Student: {getStudentName(grade.student_id)}</span>
                            <span className="grade-subject">Subject: {grade.subject}</span>
                            <span className="grade-score">Score: {grade.score}</span>
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(grade.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={() => setIsModalOpen(true)}>Add Grade</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3>Add Grade</h3>
                <form className="grade-form" onSubmit={handleSubmit}>
                    <select
                        name="student_id"
                        value={newGrade.student_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="subject"
                        value={newGrade.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        required
                    />
                    <input
                        type="number"
                        name="score"
                        value={newGrade.score}
                        onChange={handleInputChange}
                        placeholder="Score"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Grade'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Grades;
