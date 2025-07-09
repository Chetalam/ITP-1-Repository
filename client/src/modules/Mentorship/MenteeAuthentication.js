import React, { useState } from 'react';
import axios from 'axios';

const MenteeAuthentication = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN request
        const res = await axios.post('http://localhost/ITP-1-Repository/server/mentee_login.php', {
          email: form.email,
          password: form.password,
        });

        if (res.data.success) {
          alert(res.data.message);
          onLogin(res.data); // pass data to parent
        } else {
          alert(res.data.message);
        }
      } else {
        // REGISTER request
        const res = await axios.post('http://localhost/ITP-1-Repository/server/mentee_register.php', {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        if (res.data.success) {
          alert('Registered successfully! You can now log in.');
          setIsLogin(true);
          setForm({ name: '', email: '', password: '' });
        } else {
          alert(res.data.message || 'Registration failed.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Mentee {isLogin ? 'Login' : 'Register'}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default MenteeAuthentication;
