import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import DonorAuthentication from './DonorAuthentication';
import ScholarAuthentication from './ScholarAuthentication';
import DonorDashboard from './DonorDashboard';
import ScholarApply from './ScholarApply';

const DonorModule = () => {
  const [activeRole, setActiveRole] = useState('donor'); // "donor" or "scholar"
  const [donorData, setDonorData] = useState(null);
  const [scholarData, setScholarData] = useState(null);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios
      .get('/api/donors')
      .then((res) => setDonors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Why Sponsorship Matters</h1>
        <p>
          Sponsorship is a powerful way to support growth, learning, and personal development.<br />
          Through guidance, encouragement, and resource-sharing, donors help individuals build confidence, navigate challenges, and reach their goals.<br />
          Whether you are starting your journey or aiming higher, having a sponsor can make a meaningful difference.
        </p>

        <h2>Real Sponsorship Experience</h2>
        <img
          src="/images/Ambassadorsgirlsscholarshipprogramme.jpg"
          alt="Scholarships for young girls"
          className="picture"
        />
        <p className="story">
          This project, funded by USAID through AED, has supported over 6,000 girls.
          The programme has emphasised interventions that empower girls through scholarships and support.
          It has accelerated participation of disadvantaged girls in primary and secondary education.
        </p>

        {/* Available Donors */}
        <h2>Available Donors</h2>
        {donors.length > 0 ? (
          <ul>
            {donors.map((d) => (
              <li key={d.id}>{d.name}</li>
            ))}
          </ul>
        ) : (
          <p>No donors available at the moment.</p>
        )}
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === 'donor' ? 'active' : ''}
            onClick={() => setActiveRole('donor')}
          >
            Donor
          </button>
          <button
            className={activeRole === 'scholar' ? 'active' : ''}
            onClick={() => setActiveRole('scholar')}
          >
            Scholar
          </button>
        </div>

        {/* Sponsorship Opportunities */}
        <h1>Sponsorship Opportunities</h1>
        <ul className="sponsorship-list">
          <li>
            <a href="https://ngaaf.go.ke/programs/" target="_blank" rel="noopener noreferrer">
              National Government Affirmative Action Fund (NGAAF)
            </a>
          </li>
          <li>
            <a href="https://www.kiswcd.co.ke/scholarships/" target="_blank" rel="noopener noreferrer">
              Kenya Institute of Social Work & Community Development (KISWCD)
            </a>
          </li>
          <li>
            <a href="https://villagevolunteers.org/country/butterfly-project-scholarships/" target="_blank" rel="noopener noreferrer">
              Butterfly Project Scholarships
            </a>
          </li>
          <li>
            <a href="https://www.kiberayouth.org/kibera-girls-scholarship-program" target="_blank" rel="noopener noreferrer">
              Kibera Girls Scholarship Program
            </a>
          </li>
          <li>
            <a href="https://maasaigirlseducation.org/what-we-do/scholarship-program/" target="_blank" rel="noopener noreferrer">
              Maasai Girls Education Fund (MGEF)
            </a>
          </li>
          <li>
            <a href="https://www.amazinggirls.org/amazing-scholarship-program" target="_blank" rel="noopener noreferrer">
              Amazing Maasai Girls Project
            </a>
          </li>
          <li>
            <a href="https://themaarifafoundation.org/education-bursaries/" target="_blank" rel="noopener noreferrer">
              Maarifa Foundation
            </a>
          </li>
        </ul>
          
        {/* Authentication / Dashboard */}
        {activeRole === 'donor' ? (
          donorData ? (
            <DonorDashboard donorId={donorData.donorId} />
          ) : (
            <DonorAuthentication onLogin={setDonorData} />
          )
        ) : scholarData ? (
          <ScholarApply scholarId={scholarData.scholarId} />
        ) : (
          <ScholarAuthentication onLogin={setScholarData} />
        )}
      </div>
    </div>
  );
};

export default DonorModule;
