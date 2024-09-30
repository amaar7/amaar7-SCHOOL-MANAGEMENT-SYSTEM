import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import Attendance from './Attendance';
import Grades from './Grades';


function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/students">Students</Link></li>
                    <li><Link to="/teachers">Teachers</Link></li>
                    <li><Link to="/classes">Classes</Link></li>
                    <li><Link to="/attendance">Attendance</Link></li>
                    <li><Link to="/grades">Grades</Link></li>
                </ul>
            </nav>

            <Routes> {/* Wrap all Route components inside Routes */}
                <Route path="/students" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/grades" element={<Grades />} />
            </Routes>
        </Router>
    );
}

export default App;
