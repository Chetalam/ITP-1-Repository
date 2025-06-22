import React from 'react';
// In App.js
import '../../App.css';

const LeadershipModule = () => {
  return (
    <>
      {/* Navigation Bar */}
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/mentorship">Mentorship</a>
        <a href="/scholarship">Scholarship</a>
        <a href="/leadership">Leadership</a>
        <a href="/contact">Contact Us</a>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="left-section">
          <h1>What is Leadership?</h1>
          <p>
            Leadership is all about guiding, influencing, and inspiring people or teams to hit common goals.<br />
            It is about making smart decisions, encouraging teamwork, and helping others release their full potential.<br />
            Strong leadership is super important for any organization because it drives growth, builds a positive vibe, and helps everyone reach their best.
          </p>

          <h2>Inspirational Story</h2>
          <img
            alt="Inspirational Image"
            className="picture"
          />
          <p className="story">
            Once, a young leader faced a daunting challenge. With determination and a clear vision, they rallied their team, fostering trust and collaboration.
            Together, they overcame obstacles and achieved remarkable success, proving that true leadership lies in empowering others.
          </p>
        </div>

        <div className="right-section">
          <h1>Leadership Training Opportunities</h1>
          <ul className="training-list">
            <li><a href="https://example.com/training1">Leadership Essentials Course</a></li>
            <li><a href="https://example.com/training2">Advanced Leadership Workshop</a></li>
            <li><a href="https://example.com/training3">Executive Leadership Program</a></li>
            <li><a href="https://example.com/training4">Team Building and Leadership Retreat</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeadershipModule;
