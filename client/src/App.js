import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// ✅ UPDATED import path
import MentorModule from './modules/Mentorship/MentorModule';

import ScholarshipModule from './modules/Scholarship/ScholarshipModule';
import LeadershipModule from './modules/Leadership/LeadershipModule';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  const [message, setMessage] = useState('');
  const [helloMessage, setHelloMessage] = useState('');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    // Fetch /api/message using absolute URL to avoid CORS issues
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error fetching /api/message:', err));

    // Fetch /api/hello using fetch
    fetch('http://localhost:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setHelloMessage(data.message))
      .catch((error) => console.error('Error fetching /api/hello:', error));

    // Fetch /api/test using fetch
    fetch('http://localhost:5000/api/test')
      .then((res) => res.json())
      .then((data) => setTestMessage(data.message))
      .catch((error) => console.error('Error fetching /api/test:', error));
  }, []);

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>EmpowerHer</h1>

        {/* Display API messages */}
        <div style={{ marginBottom: '1rem' }}>
          {message && (
            <p style={{ fontStyle: 'italic', color: '#555' }}>
              Message from /api/message: {message}
            </p>
          )}
          {helloMessage && (
            <p style={{ fontStyle: 'italic', color: '#777' }}>
              Message from /api/hello: {helloMessage}
            </p>
          )}
          {testMessage && (
            <p style={{ fontStyle: 'italic', color: '#999' }}>
              Message from /api/test: {testMessage}
            </p>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ marginBottom: '1.5rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/mentor">Mentor's Module</Link></li>
            <li><Link to="/scholarship">Scholarship Module</Link></li>
            <li><Link to="/leadership">Leadership Module</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/mentor" element={<MentorModule />} />
          <Route path="/scholarship" element={<ScholarshipModule />} />
          <Route path="/leadership" element={<LeadershipModule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
