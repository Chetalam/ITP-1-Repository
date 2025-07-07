import React, { useState } from 'react';

export default function AuthenticationPanel({ onLogin }) {
  const [role, setRole] = useState('donor'); // default to donor
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can adapt this logic to call your donor/scholar APIs
    console.log(`${isLogin ? 'Logging in' : 'Registering'} as ${role}`, form);

    if (onLogin) {
      onLogin({ role, email: form.email });
    }
  };

  return (
    <div className="auth-panel">
      {/* Role Toggle */}
      <div className="role-tabs">
        <button
          className={role === 'donor' ? 'active' : ''}
          onClick={() => setRole('donor')}
        >
          Donor
        </button>
        <button
          className={role === 'scholar' ? 'active' : ''}
          onClick={() => setRole('scholar')}
        >
          Scholar
        </button>
      </div>

      {/* Login/Register Toggle */}
      <div className="mode-tabs">
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

      {/* Auth Form */}
      <form onSubmit={handleSubmit}>
        <h2>
          {role === 'donor' ? 'Donor' : 'Scholar'} {isLogin ? 'Login' : 'Register'}
        </h2>
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

      {/* Scholarship Opportunities List */}
      <div className="opportunities-list">
        <h2>Scholarship Opportunities</h2>
        <ul>
          <li>NGAAF Scholarship Program</li>
          <li>Maarifa Foundation</li>
          <li>Maasai Girls Education Fund</li>
          {/* Add more as needed */}
        </ul>
      </div>
    </div>
  );
}
