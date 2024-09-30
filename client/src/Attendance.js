import React, { useState, useEffect } from 'react';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [newAttendance, setNewAttendance] = useState({ date: '', student_id: '', status: '' });
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/attendance')
            .then(response => response.json())
            .then(data => setAttendance(data))
            .catch(error => console.error('Error fetching attendance:', error));

        fetch('http://localhost:5000/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAttendance(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAttendance),
        })
            .then(response => response.json())
            .then(data => {
                setAttendance([...attendance, data]);
                setNewAttendance({ date: '', student_id: '', status: '' });
            })
            .catch(error => console.error('Error recording attendance:', error));
    };

    return (
        <div>
            <h2>Attendance List</h2>
            <ul>
                {attendance.map(att => (
                    <li key={att.id}>
                        {att.date} - Student ID: {att.student_id} - Status: {att.status}
                    </li>
                ))}
            </ul>

            <h2>Record New Attendance</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={newAttendance.date}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="student_id"
                    value={newAttendance.student_id}
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
                <select
                    name="status"
                    value={newAttendance.status}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>
                <button type="submit">Record Attendance</button>
            </form>
        </div>
    );
};

export default Attendance;
