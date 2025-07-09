// client/src/App.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import MentorModule from './modules/Mentorship/MentorModule';
import DonorModule from './modules/Scholarship/DonorModule';
import TrainerModule from './modules/Leadership/TrainerModule'; // or LeadershipPortal
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

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
            <li><Link to="/mentorship">Mentorship</Link></li>
            <li><Link to="/scholarship">Scholarship</Link></li>
            <li><Link to="/leadership">Leadership</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />

          {/* Protected routes */}
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentorship"
            element={
              <ProtectedRoute>
                <MentorModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scholarship"
            element={
              <ProtectedRoute>
                <DonorModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leadership"
            element={
              <ProtectedRoute>
                <TrainerModule />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
