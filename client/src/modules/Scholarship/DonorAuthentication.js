import React, { useState } from 'react';
import axios from 'axios';

const DonorAuthentication = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost/ITP-1-Repository/server/donor_login.php', {
          email: form.email,
          password: form.password,
        });
        if (res.data.success) {
          onLogin(res.data);
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      } else {
        const res = await axios.post('http://localhost/ITP-1-Repository/server/donor_register.php', form);
        alert(res.data.message);
        if (res.data.success) {
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Register</button>
      </div>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          type="email"
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

export default DonorAuthentication;

