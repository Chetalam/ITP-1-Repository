import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import MentorAuthentication from './MentorAuthentication';
import MenteeAuthentication from './MenteeAuthentication';
import MentorDashboard from './MentorDashboard';
import MenteeApply from './MenteeApply';
import MenteeDashboard from './MenteeDashboard';

const MentorModule = () => {
  const [activeRole, setActiveRole] = useState('mentor'); // "mentor" or "mentee"
  const [mentorData, setMentorData] = useState(null);
  const [menteeData, setMenteeData] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost/ITP-1-Repository/server/get_mentors.php')
      .then((res) => setMentors(res.data))
      .catch((err) => console.error(err));
  }, [refreshKey]);

  const handleApplied = () => setRefreshKey((k) => k + 1);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Why Mentorship Matters</h1>
        <p>
          Mentorship is a powerful way to support growth, learning, and personal development.<br />
          Through guidance, encouragement, and experience-sharing, mentors help individuals build confidence, navigate challenges, and reach their goals.<br />
          Whether you are starting your journey or aiming higher, having a mentor can make a meaningful difference.
        </p>

        <h2>Real Mentorship Experience</h2>
        <img
          src="/images/Solidarityfortheadvancementofwomensagenda.jpg"
          alt="Mentorship Session"
          className="picture"
        />
        <p className="story">
          Four girls were admitted into a two-month training at Solidarity for the Advancement of Womens' Agenda (SAWA) in 2012.
          During this time, they covered various topical issues such as relationships, health and hygiene, careers, businesses, and spirituality.
          After this, they graduated with many skills such as communication, business, and interpersonal skills.
        </p>

        {/* Available Mentors */}
        <h2>Available Mentors</h2>
        {mentors.length > 0 ? (
          <ul>
            {mentors.map((m) => (
              <li key={m.id}>{m.name} ({m.email})</li>
            ))}
          </ul>
        ) : (
          <p>No mentors available at the moment.</p>
        )}
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === 'mentor' ? 'active' : ''}
            onClick={() => setActiveRole('mentor')}
          >
            Mentor
          </button>
          <button
            className={activeRole === 'mentee' ? 'active' : ''}
            onClick={() => setActiveRole('mentee')}
          >
            Mentee
          </button>
        </div>

        {/* Mentorship Opportunities */}
        <h1>Mentorship Opportunities</h1>
        <ul className="mentorship-list">
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
        {activeRole === 'mentor' ? (
          mentorData ? (
            <MentorDashboard mentorId={mentorData.mentorId} />
          ) : (
            <MentorAuthentication onLogin={setMentorData} />
          )
        ) : menteeData ? (
          <>
            <MenteeDashboard menteeId={menteeData.menteeId} refreshKey={refreshKey} />
            <MenteeApply menteeId={menteeData.menteeId} onApplied={handleApplied} />
          </>
        ) : (
          <MenteeAuthentication onLogin={setMenteeData} />
        )}
      </div>
    </div>
  );
};

export default MentorModule;
