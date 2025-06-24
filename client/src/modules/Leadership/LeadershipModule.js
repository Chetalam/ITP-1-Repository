import React, { useState } from 'react';
import '../../App.css'; // Importing global styles

const LeadershipModule = () => {
  // Optional: Manage sign-in input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // You can connect this to your backend login API
    console.log('User signed in with:', { email, password });
    alert('Sign in submitted!');
  };

  return (
    <>
      {/* Sign In Section */}
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

      {/* Main content section */}
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
            src="/images/leadership.jpg"
            alt="Inspirational"
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
