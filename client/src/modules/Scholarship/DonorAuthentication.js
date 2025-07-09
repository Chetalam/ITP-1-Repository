// src/modules/Scholarship/DonorAuth.js
import React, { useState } from 'react';
import axios from 'axios';

const DonorAuth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'donor_login.php' : 'donor_register.php';

    try {
      const res = await axios.post(`http://localhost/ITP-1-Repository/server/${endpoint}`, form);
      const data = res.data;

      if (data.success) {
        alert(data.message);
        onLogin(data); // pass to parent
      } else {
        alert(data.message || 'Action failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Donor {isLogin ? 'Login' : 'Register'}</h2>
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

export default DonorAuth;
