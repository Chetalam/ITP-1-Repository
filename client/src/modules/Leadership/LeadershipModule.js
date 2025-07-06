import React, { useState } from 'react';
import '../../App.css'; // Global CSS styles

const LeadershipModule = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('http://localhost/ITP-1-Repository/server/leadership_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }

      alert(result.message || result.error);
    } catch (err) {
      setStatus('error');
      alert('Sign in failed. Please try again.');
    }
  };

  return (
    <>
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

          {/* Floating Sign In Panel */}
          <div className="floating-signin">
            <h3>User Sign In</h3>
            <form onSubmit={handleSignIn} className="signin-form">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Signing In...' : 'Sign In'}
              </button>
              {status === 'success' && <p className="status success">Signed in successfully!</p>}
              {status === 'error' && <p className="status error">Sign in failed. Please try again.</p>}
            </form>
          </div>
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
