import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import WomenModule from './modules/Women/WomenModule';
import MentorModule from './modules/Mentor/MentorModule';
import ScholarshipModule from './modules/Scholarship/ScholarshipModule';
import LeadershipModule from './modules/Leadership/LeadershipModule';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Women Empowerment Platform</h1>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
            <li><Link to="/women">Women's Module</Link></li>
            <li><Link to="/mentor">Mentor's Module</Link></li>
            <li><Link to="/scholarship">Scholarship Module</Link></li>
            <li><Link to="/leadership">Leadership Module</Link></li>
          </ul>
        </nav>

        <Routes>
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
