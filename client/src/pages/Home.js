import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Needed for redirection
import '../App.css'; // Ensure the path is correct

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        alert(result.message || "Registration successful!");

        // ✅ Set login state in localStorage
        localStorage.setItem("isLoggedIn", "true");

        // ✅ Redirect to a protected page (you can change to /about, /mentor, etc.)
        navigate("/mentor");
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

      <div className="floating-signin">
        <h3>User Registration</h3>
        <form onSubmit={handleSubmit} className="signin-form">
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
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Submit'}
          </button>
          {status === 'success' && (
            <p className="status success">Registration successful!</p>
          )}
          {status === 'error' && (
            <p className="status error">Registration failed. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Home;


