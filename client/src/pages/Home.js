import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Needed for redirection
import '../App.css'; // Ensure the path is correct

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('success');
        alert(result.message || "Registration successful!");
      } else {
        setStatus('error');
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      setStatus('error');
      alert("Failed to connect to the server.");
      console.error("Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        setLoginStatus('success');
        navigate("/about");
      } else {
        setLoginStatus('error');
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      setLoginStatus('error');
      alert("Failed to connect to the server.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Empowerment Platform</h1>

      <p>
        We are dedicated to supporting and uplifting young women across Kenya and beyond.
        Our platform brings together opportunities for personal and professional growth through mentorship,
        leadership training, and scholarships.
      </p>
      <p>
        We believe in the power of connection and community. By bringing together mentors, resources, and
        learning opportunities, we aim to ensure that every girl has a chance to learn, grow, and succeed.
      </p>

      <div className="floating-signin-blocks">
        <div className="signin-block">
          <h3>User Registration</h3>
          <form onSubmit={handleRegister} className="signin-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              {status === 'loading' ? 'Submitting...' : 'Register'}
            </button>
            {status === 'success' && (
              <p className="status success">Registration successful!</p>
            )}
            {status === 'error' && (
              <p className="status error">Registration failed. Please try again.</p>
            )}
          </form>
        </div>
        <div className="signin-block">
          <h3>User Login</h3>
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="signin-form">
              <input
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loginStatus === 'loading'}>
                {loginStatus === 'loading' ? 'Logging in...' : 'Login'}
              </button>
              {loginStatus === 'error' && (
                <p className="status error">Login failed. Please try again.</p>
              )}
            </form>
          ) : (
            <p>Welcome back! You are logged in.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;


