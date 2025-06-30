import React, { useState } from 'react';
import '../App.css'; // ✅ Adjusted path to App.css correctly

function Home() {
  // State for form input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/ITP-1-Repository/server/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      const result = await res.json();
      alert(result.message || result.error);
    } catch (error) {
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

      {/* Login Form */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />

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
          Phone Number:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
