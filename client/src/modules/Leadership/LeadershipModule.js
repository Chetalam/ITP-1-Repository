import React from 'react';
import '../../App.css'; // Importing global styles

// Functional component for displaying leadership content and resources
const LeadershipModule = () => {
  return (
    <>
      {/* Main container for the page content */}
      <div className="content">
        
        {/* Left section: Definition of leadership and an inspirational story */}
        <div className="left-section">
          <h1>What is Leadership?</h1>
          <p>
            Leadership is all about guiding, influencing, and inspiring people or teams to hit common goals.<br />
            It is about making smart decisions, encouraging teamwork, and helping others release their full potential.<br />
            Strong leadership is super important for any organization because it drives growth, builds a positive vibe, and helps everyone reach their best.
          </p>

          {/* Section for real or fictional inspirational leadership story */}
          <h2>Inspirational Story</h2>
          <img
            // Placeholder image — replace with a real image path like /images/leadership.jpg
            src="/images/Maasaiwomanandstudents.jpg"
            alt="Kenyan rebel evades child marriage and Maasai curses to win power After outmaneuvering her illiterate father three times by the age of 18 to escape his plans to make her a child bride, Peris Tobiko decided the only way to protect other Maasai girls in Kenya from harmful traditions was to become a leader"
            className="picture"
          />
          <p className="story">
            Kenyan rebel evades child marriage and Maasai curses to win power. After outmaneuvering her illiterate father three times by the age of 18 to escape his plans to make her a child bride, Peris Tobiko decided the only way to protect other Maasai girls in Kenya from harmful traditions was to become a leader.          
            </p>
        </div>

        {/* Right section: Links to leadership training opportunities */}
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

// Exporting the component so it can be used in other parts of the app (e.g., in routing)
export default LeadershipModule;
