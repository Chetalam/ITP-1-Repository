// TrainerAuthentication.js
import React, { useState } from 'react';
import axios from 'axios';

const TrainerAuthentication = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost/ITP-1-Repository/server/trainer_login.php"
        : "http://localhost/ITP-1-Repository/server/trainer_register.php";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const response = await axios.post(url, payload);

      if (response.data.success) {
        alert(response.data.message);
        if (isLogin && onLogin) {
          onLogin(response.data); // Pass user info to parent component
        } else {
          // Reset form and switch to login view
          setIsLogin(true);
          setForm({ name: '', email: '', password: '' });
        }
      } else {
        alert(response.data.message || "Action failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? 'active' : ''}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? 'active' : ''}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Trainer {isLogin ? "Login" : "Register"}</h2>

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

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default TrainerAuthentication;
