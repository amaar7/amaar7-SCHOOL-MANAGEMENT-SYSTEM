import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import Attendance from './Attendance';
import Grades from './Grades';
import './App.css';
import Sidebar from './Sidebar'; 

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`app-container ${collapsed ? 'collapsed' : ''}`}>
      <Router>
        <Sidebar collapsed={collapsed} handleToggle={handleToggle} />
        <main className="content-container">
          <Routes>
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/grades" element={<Grades />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
