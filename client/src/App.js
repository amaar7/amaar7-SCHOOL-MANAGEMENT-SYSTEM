import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Students from './Students'; // Adjust path if necessary
import Teachers from './Teachers'; // Adjust path if necessary

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/students">Students</Link></li>
                    <li><Link to="/teachers">Teachers</Link></li>
                </ul>
            </nav>

            {/* Use Routes and Route from react-router-dom */}
            <Routes>
                <Route path="/students" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
            </Routes>
        </Router>
    );
}

export default App;
