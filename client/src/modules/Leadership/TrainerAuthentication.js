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
        ? "http://localhost/your-folder/trainer_login.php"
        : "http://localhost/your-folder/trainer_register.php";

      const response = await axios.post(url, form);

      if (response.data.success) {
        alert(response.data.message);

        if (isLogin) {
          // Pass user data to parent on successful login
          onLogin(response.data.user);
        } else {
          // Reset form and switch to login mode after successful registration
          setForm({ name: '', email: '', password: '' });
          setIsLogin(true);
        }
      } else {
        alert(response.data.message || "Action failed.");
      }
    } catch (error) {
      console.error("Error:", error);
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
            placeholder="Name"
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

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default TrainerAuthentication;

