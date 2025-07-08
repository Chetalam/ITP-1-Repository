import React, { useState } from 'react';
import axios from 'axios';

const MentorAuthentication = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post('http://localhost/ITP-1-Repository/server/mentor_login.php', {
          email: form.email,
          password: form.password,
        });

        if (res.data.success) {
          onLogin(res.data); // Pass mentor data to parent
        } else {
          alert(res.data.message || 'Login failed. Please check your credentials.');
        }
      } else {
        const res = await axios.post('http://localhost/ITP-1-Repository/server/mentor_login.php', form);
        
        if (res.data.success) {
          alert('Registered successfully! You can now log in.');
          setIsLogin(true);
          setForm({ name: '', email: '', password: '' });
        } else {
          alert(res.data.message || 'Registration failed.');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Mentor {isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default MentorAuthentication;
