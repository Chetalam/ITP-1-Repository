import React, { useState } from 'react';
import '../../App.css';

const ScholarshipModule = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setStatus('loading');

<<<<<<< HEAD
    const res = await fetch('http://localhost/ITP-1-Repository/server/scholarship_login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
=======
    try {
      const res = await fetch('http://localhost/ITP-1-Repository/server/signin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
>>>>>>> 69f2df5ce942071baf0a35a0755761c2e31a0e36

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
        <div className="left-section">
          <h1>Scholarships for Women</h1>
          <p>
            Scholarships can open doors to educational and professional growth.<br />
            They help eliminate financial barriers, making it possible for deserving students to pursue their dreams.<br />
            Whether it's tuition, living expenses, or study resources, scholarships ease the burden and create pathways to success.<br />
            Take a step toward your future by exploring and applying for available opportunities.
          </p>
          <h2>Success Story</h2>
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
        <div className="right-section">
          <h1>Available Scholarships</h1>
          <ul className="scholarship-list">
            <li><a href="https://example.com/scholarship1" target="_blank" rel="noopener noreferrer">Undergraduate Women in Tech Scholarship</a></li>
            <li><a href="https://example.com/scholarship2" target="_blank" rel="noopener noreferrer">STEM Excellence Grant for Girls</a></li>
            <li><a href="https://example.com/scholarship3" target="_blank" rel="noopener noreferrer">Community Leaders Academic Fund</a></li>
            <li><a href="https://example.com/scholarship4" target="_blank" rel="noopener noreferrer">International Education Support Scholarship</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ScholarshipModule;
