import React, { useState } from 'react';

export default function MentorRegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', description: '' });
  const [message, setMessage] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      description: (form.description && form.description.trim()) ? form.description.trim() : '',
    };
    const res = await fetch('/api/mentor/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <>
      <h2>Mentor Registration</h2>
      <p>Please fill in all fields, including your mentorship scope.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input name="name" id="name" placeholder="Name" onChange={handleChange} value={form.name} required />
        <label htmlFor="email">Email:</label>
        <input name="email" id="email" placeholder="Email" onChange={handleChange} value={form.email} required />
        <label htmlFor="description">Mentorship Scope:</label>
        <textarea name="description" id="description" placeholder="Describe your mentorship scope" value={form.description} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input name="password" id="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} required />
        <button type="submit">Register</button>
        {message && <div>{message}</div>}
      </form>
      <div style={{ border: '2px solid #007bff', borderRadius: '8px', padding: '20px', marginTop: '24px', maxWidth: '400px', background: '#f9f9f9' }}>
        <h3 style={{ marginTop: 0 }}>Mentor Login</h3>
        <p>Log in using your <strong>email</strong> and password.</p>
        <form onSubmit={async e => {
          e.preventDefault();
          const res = await fetch('/api/mentor/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginForm),
          });
          const data = await res.json();
          setMessage(data.message);
        }}>
          <label htmlFor="mentor-login-email">Email:</label>
          <input
            name="email"
            id="mentor-login-email"
            type="email"
            placeholder="Enter your email address"
            value={loginForm.email}
            onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
            required
            style={{ minHeight: '32px', fontSize: '16px', marginBottom: '12px' }}
          />
          <label htmlFor="mentor-login-password">Password:</label>
          <input
            name="password"
            id="mentor-login-password"
            type="password"
            placeholder="Enter your password"
            value={loginForm.password}
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
            required
            style={{ minHeight: '32px', fontSize: '16px', marginBottom: '12px' }}
          />
          <button type="submit" style={{ minHeight: '32px', fontSize: '16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Log In</button>
        </form>
      </div>
    </>
  );
}
