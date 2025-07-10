import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

import DonorAuthentication from './DonorAuthentication';
import DonorDashboard from './DonorDashboard';
import ScholarAuthentication from './ScholarAuthentication';
import ScholarDashboard from './ScholarDashboard';
import ScholarApply from './ScholarApply';

const DonorScholarPortal = () => {
  const [activeRole, setActiveRole] = useState('donor');
  const [donorData, setDonorData] = useState(null);
  const [scholarData, setScholarData] = useState(null);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/ITP-1-Repository/server/get_donors.php')
      .then((res) => setDonors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>
          {activeRole === 'donor' ? 'Donor Portal' : 'Scholar Portal'}
        </h1>
        <p>
          {activeRole === 'donor'
            ? 'Register or log in to sponsor scholars and see your dashboard.'
            : 'Register or log in to apply for sponsorships and view your applications.'}
        </p>
        <h2>Why Scholarships Matter</h2>
        <p>
          Sponsorship fosters growth, learning, and empowerment for both donors and scholars.
          It can change lives by providing access to education and resources.
        </p>
        <h2>Real Impact Story</h2>
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
        <div className="opportunities-list">
          <h2>Scholarship Opportunities</h2>
          <ul>
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
        </div>
        {donors.length > 0 && (
          <div className="donors-list">
            <h2>Our Donors</h2>
            <ul>
              {donors.map((donor) => (
                <li key={donor.id}>{donor.name}</li>
              ))}
            </ul>
          </div>
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

        {/* Merged Role View */}
        {activeRole === 'scholar' ? (
          scholarData ? (
            <>
              <ScholarDashboard scholarId={scholarData.scholarId} />
              <ScholarApply scholarId={scholarData.scholarId} />
            </>
          ) : (
            <ScholarAuthentication onLogin={setScholarData} />
          )
        ) : donorData ? (
          <DonorDashboard donorId={donorData.donorId} />
        ) : (
          <DonorAuthentication onLogin={setDonorData} />
        )}
      </div>
    </div>
  );
};

export default DonorScholarPortal;
