import React, { useState } from 'react';

function Home() {
  // State to store user inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload

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
    } catch (err) {
      alert("Failed to connect to server");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Our Empowerment Platform</h1>
      <p>
        We are dedicated to supporting and uplifting young women across Kenya and beyond. Our platform brings together
        opportunities for personal and professional growth through mentorship, leadership training, and scholarships.
      </p>

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
