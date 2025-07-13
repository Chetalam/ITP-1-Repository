import React, { useState } from 'react';

const DonorAuthentication = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? 'http://localhost/ITP-1-Repository/server/donor_login.php'
        : 'http://localhost/ITP-1-Repository/server/donor_register.php';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        alert(result.message);
        if (isLogin && onLogin) {
          onLogin(result); // pass result to parent
        }
        if (!isLogin) {
          setIsLogin(true); // switch to login after registration
        }
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
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
          <>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Scholarship Scope"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </>
        )}
        {isLogin && (
          <>
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
          </>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default DonorAuthentication;


