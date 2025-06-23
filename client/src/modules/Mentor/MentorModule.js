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
            src="/images/mentorship.jpg" // Replace with actual image path if different
            alt="Mentorship Session"
            className="picture"
          />
          <p className="story">
            After joining a mentorship program, Aisha connected with a professional in her field.
            With regular support and practical advice, she gained direction and landed an internship.
            Mentorship gave her the clarity and motivation she needed to move forward.
          </p>
        </div>

        {/* Right section: List of external mentorship opportunities */}
        <div className="right-section">
          <h1>Mentorship Opportunities</h1>
          <ul className="mentorship-list">
            <li><a href="https://example.com/mentorship1">Women in Tech Mentorship Program</a></li>
            <li><a href="https://example.com/mentorship2">Career Guidance for Young Women</a></li>
            <li><a href="https://example.com/mentorship3">Entrepreneurship Mentorship Circle</a></li>
            <li><a href="https://example.com/mentorship4">Peer Mentorship & Support Network</a></li>
          </ul>
        </div>

      </div>
    </>
  );
};

// Export the component for use in routing or other modules
export default MentorModule;
