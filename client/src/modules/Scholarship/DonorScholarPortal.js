import React, { useState } from 'react';
import '../../App.css';

import DonorAuthentication from './DonorAuthentication';
import DonorDashboard from './DonorDashboard';
import ScholarAuthentication from './ScholarAuthentication';
import ScholarApply from './ScholarApply';

const DonorScholarPortal = () => {
  const [activeRole, setActiveRole] = useState('donor');
  const [donorData, setDonorData] = useState(null);
  const [scholarData, setScholarData] = useState(null);

  return (
    <div className="content">
      {/* Left */}
      <div className="left-section">
        <h1>
          {activeRole === 'donor' ? 'Donor Portal' : 'Scholar Portal'}
        </h1>
        <p>
          {activeRole === 'donor'
            ? 'Register or log in to sponsor scholars and see your dashboard.'
            : 'Register or log in to apply for sponsorships and connect with donors.'}
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
      </div>

      {/* Right */}
      <div className="right-section">
        {/* Top Role Tabs */}
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

        {/* Authentication / Dashboard */}
        {activeRole === 'donor' ? (
          !donorData ? (
            <DonorAuthentication onLogin={setDonorData} />
          ) : (
            <DonorDashboard donorId={donorData.donorId} />
          )
        ) : (
          !scholarData ? (
            <ScholarAuthentication onLogin={setScholarData} />
          ) : (
            <ScholarApply scholarId={scholarData.scholarId} />
          )
        )}

        {/* Scholarship Opportunities */}
        <div className="opportunities-list">
          <h2>Scholarship Opportunities</h2>
          <ul>
            <li>NGAAF Scholarship Program (Kenya)</li>
            <li>Maarifa Foundation Scholarships</li>
            <li>Maasai Girls Education Fund</li>
            <li>Equity Wings to Fly Scholarship</li>
            <li>KCB Foundation Scholarship</li>
            <li>Kenya Education Fund</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonorScholarPortal;
