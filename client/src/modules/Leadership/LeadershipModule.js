import React, { useState } from 'react';
import '../../App.css'; // Global CSS styles

const LeadershipModule = () => {
  // State to manage sign-in form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('User signed in with:', { email, password });
    alert('Sign in submitted!');
  };

  return (
    <>
      {/* Sign In Form */}
      <div className="signin-section">
        <h2>User Sign In</h2>
        <form onSubmit={handleSignIn} className="signin-form">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Main Leadership Content */}
      <div className="content">
        {/* Left Section */}
        <div className="left-section">
          <h1>What is Leadership?</h1>
          <p>
            Leadership is all about guiding, influencing, and inspiring people or teams to hit common goals.<br />
            It is about making smart decisions, encouraging teamwork, and helping others release their full potential.<br />
            Strong leadership is super important for any organization because it drives growth, builds a positive vibe, and helps everyone reach their best.
          </p>

          <h2>Inspirational Story</h2>
          <img
            src="/images/Maasaiwomanandstudents.jpg"
            alt="Kenyan rebel evades child marriage and Maasai curses to win power"
            className="picture"
          />
          <p className="story">
            Kenyan rebel evades child marriage and Maasai curses to win power.
            After outmaneuvering her illiterate father three times by the age of 18 to escape his plans to make her a child bride,
            Peris Tobiko decided the only way to protect other Maasai girls in Kenya from harmful traditions was to become a leader.
          </p>
        </div>

        {/* Right Section */}
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
