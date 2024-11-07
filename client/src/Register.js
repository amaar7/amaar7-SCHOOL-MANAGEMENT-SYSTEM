import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('guest');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Registration successful");
        navigate('/login');
      } else {
        alert("Registration failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="guest">Guest</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
