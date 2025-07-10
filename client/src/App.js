// client/src/App.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import MentorModule from './modules/Mentorship/MentorModule';
import DonorScholarPortal from './modules/Scholarship/DonorScholarPortal'; // ✅ Correct import
import TrainerModule from './modules/Leadership/TrainerModule';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import RegisterForm from './components/RegisterForm';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
      style={{
        marginLeft: 'auto',
        background: '#d9534f',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        borderRadius: '4px'
      }}
    >
      Logout
    </button>
  );
}

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

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>EmpowerHer</h1>
        <nav
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '20px',
              padding: 0,
              margin: 0
            }}
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/mentorship">Mentorship</Link></li>
            <li><Link to="/scholarship">Scholarship</Link></li>
            <li><Link to="/leadership">Leadership</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          {isLoggedIn && <LogoutButton />}
        </nav>

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />

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
                <DonorScholarPortal />
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
