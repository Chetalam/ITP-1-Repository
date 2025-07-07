import React from 'react';
// import { Link } from 'react-router-dom'; // Unused import, can be removed if not using <Link>
import '../../App.css'; // Import shared CSS styles

// Functional component for the Mentorship section
const MentorModule = () => {
  return (
    <>
      {/* Main container for the mentorship content */}
      <div className="content">
        
        {/* Left section: Introduction and success story */}
        <div className="left-section">
          <h1>Why Mentorship Matters</h1>
          <p>
            Mentorship is a powerful way to support growth, learning, and personal development.<br />
            Through guidance, encouragement, and experience-sharing, mentors help individuals build confidence, navigate challenges, and reach their goals.<br />
            Whether you are starting your journey or aiming higher, having a mentor can make a meaningful difference.
          </p>

          {/* Success Story Section */}
          <h2>Real Mentorship Experience</h2>
          <img
            src="/images/Solidarityfortheadvancementofwomensagenda.jpg" // Replace with actual image path if different
            alt="Mentorship Session"
            className="picture"
          />
          <p className="story">
            Four girls were admitted into a two-month training at Solidarity for the Advancement of Womens' Agenda (SAWA) in 2012. 
            During this time, they covered various topical issues such as relationships, health and hygiene, careers, businesses and spirituality. 
            After this, they graduated with many skills such as communication, business and interpersonal skills.
          </p>
        </div>

        {/* Right section: List of external mentorship opportunities */}
        <div className="right-section">
          <h1>Mentorship Opportunities</h1>
          <ul className="mentorship-list">
            <li><a href="https://femiscope.org/">Femiscope Initiative (Githurai 44, Nairobi)</a></li>
            <li><a href="https://passiontosharefoundation.org/mentorship-program/">Passion to Share Foundation – “Gift Her Hands” (Kibera, Nairobi)</a></li>
            <li><a href="https://swahiba.org/mentorship-empowerment-program/">Swahiba Networks – Mentorship & Empowerment Program (MEP)</a></li>
            <li><a href="https://hopeforgirls.or.ke/mentorship/">HOPE for Girls @ VISA</a></li>
            <li><a href="https://mentormatchkenya.com/">Mentor Match Kenya</a></li>
            <li><a href="https://www.centerformentorship.co.ke/">Center for Mentorship & Counselling</a></li>
          </ul>
        </div>

      </div>
    </>
  );
};

// Export the component for use in routing or other modules
export default MentorModule;
