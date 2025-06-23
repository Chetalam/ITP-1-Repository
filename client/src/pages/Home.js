import React from 'react';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
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

      {/* Login / Registration Form */}
      <h2>Join Us</h2>
      <form style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name:</label><br />
          <input type="text" name="fullname" placeholder="Enter full name" required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input type="email" name="email" placeholder="Enter email" required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone Number:</label><br />
          <input type="tel" name="phone" placeholder="Enter phone number" required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#ff69b4', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;

