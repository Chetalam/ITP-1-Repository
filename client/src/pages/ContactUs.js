import React, { useState } from 'react';

function ContactUs() {
  // State for the form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission (here just log to console)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', formData);
    alert('Thank you for reaching out! We will get back to you shortly.');
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-content">
      <h1>Get in Touch With Us</h1>
      <p>
        We would love to hear from you! Whether you have a question about our programs, want to partner with us, or are
        simply seeking guidance—our team is here to help.
      </p>
      <p>
        You can contact us via email or phone, or even visit our offices if you're nearby. We’re committed to maintaining an
        open channel of communication to ensure that every girl and woman who seeks help can find it.
      </p>

      <ul>
        <li>
          Email: <a href="mailto:support@empowerwomen.ke">support@empowerwomen.ke</a>
        </li>
        <li>
          Phone: <a href="tel:+254790268032">+254 790 268 032</a>
        </li>
        <li>
          Phone: <a href="tel:+254114889348">+254 114 889 348</a>
        </li>
        <li>Address: Nairobi, Kenya</li>
      </ul>

      <h2>Send Us a Message</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={fieldStyle}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={fieldStyle}>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
}

// Basic inline styles
const formStyle = {
  maxWidth: '400px',
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px'
};

export default ContactUs;
