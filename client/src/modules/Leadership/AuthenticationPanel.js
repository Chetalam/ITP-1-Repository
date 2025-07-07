import React, { useState } from 'react';

export default function AuthenticationPanel({ onLogin }) {
  const [role, setRole] = useState('trainer'); // default to trainer
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can adapt this logic to call your trainer/trainee APIs
    console.log(`${isLogin ? 'Logging in' : 'Registering'} as ${role}`, form);
  };

  return (
    <div className="auth-panel">
      {/* Role Toggle */}
      <div className="role-tabs">
        <button
          className={role === 'trainer' ? 'active' : ''}
          onClick={() => setRole('trainer')}
        >
          Trainer
        </button>
        <button
          className={role === 'trainee' ? 'active' : ''}
          onClick={() => setRole('trainee')}
        >
          Trainee
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

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <h2>
          {role === 'trainer' ? 'Trainer' : 'Trainee'} {isLogin ? 'Login' : 'Register'}
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

      {/* Training Opportunities List */}
      <div className="opportunities-list">
        <h2>Training Opportunities</h2>
        <ul>
          <li>Femiscope Initiative...</li>
          <li>Passion to Share Foundation...</li>
          <li>Swahiba Networks...</li>
          {/* ... */}
        </ul>
      </div>
    </div>
  );
}
