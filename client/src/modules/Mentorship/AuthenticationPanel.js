export default function AuthenticationPanel({ onLogin }) {
  // ... same state logic ...

  return (
    <div className="auth-panel">
      {/* Role Toggle */}
      <div className="role-tabs">
        <button
          className={role === 'mentor' ? 'active' : ''}
          onClick={() => setRole('mentor')}
        >
          Mentor
        </button>
        <button
          className={role === 'mentee' ? 'active' : ''}
          onClick={() => setRole('mentee')}
        >
          Mentee
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
          {role === 'mentor' ? 'Mentor' : 'Mentee'} {isLogin ? 'Login' : 'Register'}
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

      {/* Mentorship Opportunities List */}
      <div className="opportunities-list">
        <h2>Mentorship Opportunities</h2>
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
