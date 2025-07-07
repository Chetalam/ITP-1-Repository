// ScholarshipOfficeAuthentication.js
import React, { useState } from "react";
import axios from "axios";

const ScholarshipOfficeAuthentication = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("/api/scholarship-office/login", {
          email: form.email,
          password: form.password,
        });
        onLogin(res.data); // Expecting { officeId, name }
      } else {
        await axios.post("/api/scholarship-office/register", form);
        alert("Registered successfully! You can now log in.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      console.error("Scholarship Office authentication error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Scholarship Office {isLogin ? "Login" : "Register"}</h2>
        {!isLogin && (
          <input
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

export default ScholarshipOfficeAuthentication;
