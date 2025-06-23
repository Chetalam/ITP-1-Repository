import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import WomenModule from './modules/Women/WomenModule';
import MentorModule from './modules/Mentor/MentorModule';
import ScholarshipModule from './modules/Scholarship/ScholarshipModule';
import LeadershipModule from './modules/Leadership/LeadershipModule';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  const [message, setMessage] = useState('');
  const [helloMessage, setHelloMessage] = useState('');

  // Fetch both messages from backend on app load
  useEffect(() => {
    axios.get('http://localhost:5000/api/message')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error fetching /api/message:", error));

    fetch('http://localhost:5000/api/hello')
      .then(res => res.json())
      .then(data => setHelloMessage(data.message))
      .catch(error => console.error("Error fetching /api/hello:", error));
  }, []);

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Women Empowerment Platform</h1>

        {/* Display both API messages */}
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

        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/women">Women's Module</Link></li>
            <li><Link to="/mentor">Mentor's Module</Link></li>
            <li><Link to="/scholarship">Scholarship Module</Link></li>
            <li><Link to="/leadership">Leadership Module</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/women" element={<WomenModule />} />
          <Route path="/mentor" element={<MentorModule />} />
          <Route path="/scholarship" element={<ScholarshipModule />} />
          <Route path="/leadership" element={<LeadershipModule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
