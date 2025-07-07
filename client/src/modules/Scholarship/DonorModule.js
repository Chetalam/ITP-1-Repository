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
            <a href="https://femiscope.org/" target="_blank" rel="noopener noreferrer">
              Femiscope Initiative (Githurai 44, Nairobi)
            </a>
          </li>
          <li>
            <a href="https://passiontosharefoundation.org/mentorship-program/" target="_blank" rel="noopener noreferrer">
              Passion to Share Foundation – “Gift Her Hands” (Kibera, Nairobi)
            </a>
          </li>
          <li>
            <a href="https://swahiba.org/mentorship-empowerment-program/" target="_blank" rel="noopener noreferrer">
              Swahiba Networks – Mentorship & Empowerment Program (MEP)
            </a>
          </li>
          <li>
            <a href="https://hopeforgirls.or.ke/mentorship/" target="_blank" rel="noopener noreferrer">
              HOPE for Girls @ VISA
            </a>
          </li>
          <li>
            <a href="https://mentormatchkenya.com/" target="_blank" rel="noopener noreferrer">
              Mentor Match Kenya
            </a>
          </li>
          <li>
            <a href="https://www.centerformentorship.co.ke/" target="_blank" rel="noopener noreferrer">
              Center for Mentorship & Counselling
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
