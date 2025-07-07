// client/src/App.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import MentorModule from './modules/Mentorship/MentorModule';
import ScholarshipModule from './modules/Scholarship/ScholarshipModule';
import LeadershipModule from './modules/Leadership/LeadershipModule';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/status')
      .then(res => {
        console.log('✅ Backend status:', res.data);
      })
      .catch(err => {
        console.error('❌ Backend not responding:', err);
      });
  }, []);

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>EmpowerHer</h1>
        <nav style={{ marginBottom: '1.5rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/mentor">Mentor</Link></li>
            <li><Link to="/scholarship">Scholarship</Link></li>
            <li><Link to="/leadership">Leadership</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="/mentor" element={<ProtectedRoute><MentorModule /></ProtectedRoute>} />
          <Route path="/scholarship" element={<ProtectedRoute><ScholarshipModule /></ProtectedRoute>} />
          <Route path="/leadership" element={<ProtectedRoute><LeadershipModule /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
