import React, { useState } from 'react';
import axios from 'axios';

const ScholarAuthentication = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? 'http://localhost/ITP-1-Repository/server/scholar_login.php'
      : 'http://localhost/ITP-1-Repository/server/scholar_register.php';

    try {
      const response = await axios.post(endpoint, form);
      const data = response.data;

      if (data.success) {
        alert(data.message);

        if (isLogin) {
          // ✅ Save scholarId to localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("scholarId", data.scholarId);

          // Call parent callback with user data
          onLogin(data);
        } else {
          // Registration successful: clear form and switch to login
          setForm({ name: '', email: '', password: '' });
          setIsLogin(true);
        }
      } else {
        alert(data.message || 'Action failed.');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Scholar Login
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Scholar Register
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Scholar Login' : 'Scholar Registration'}</h2>

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

        <button type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default ScholarAuthentication;
