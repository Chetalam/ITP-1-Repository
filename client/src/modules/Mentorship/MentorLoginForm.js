import React, { useState } from 'react';

export default function MentorLoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [mentor, setMentor] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    const res = await fetch('/api/mentor/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.mentorId) setMentor(data);
    setMessage(data.message || data.error);
  };

  const handleDescriptionSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/mentor/${mentor.mentorId}/description`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    setMessage('Mentorship scope updated!');
    setMentor({ ...mentor, needsDescription: false, description });
  };

  return (
    <div>
      {!mentor ? (
        <form onSubmit={handleLogin}>
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      ) : mentor.needsDescription ? (
        <form onSubmit={handleDescriptionSubmit}>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your mentorship scope"
            required
          />
          <button type="submit">Save Description</button>
        </form>
      ) : (
        <div>
          <h3>Welcome, {mentor.name}!</h3>
          <p>Your mentorship scope: {mentor.description}</p>
        </div>
      )}
      {message && <div>{message}</div>}
    </div>
  );
}
