import React, { useState } from "react";
import "./MentorModule.css"; // Make sure your styles are imported
import MenteeAuthentication from "./MenteeAuthentication";
import MenteeApply from "./MenteeApply";

export default function MentorMenteeModule() {
  const [role, setRole] = useState("mentor"); // "mentor" or "mentee"
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [menteeData, setMenteeData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${mode} as ${role}:`, { email, password });
    // TODO: Add mentor login/register API calls if needed
  };

  return (
    <div className="content">
      <div className="left-section">
        <h1>{role === "mentor" ? "Mentor Portal" : "Mentee Portal"}</h1>
        <p>
          {role === "mentor"
            ? "Mentors can log in or register below."
            : "Mentees can register, log in, and apply to a mentor here."}
        </p>
      </div>

      <div className="right-section">
        {/* Role Tabs */}
        <div className="role-tabs">
          <button
            className={role === "mentor" ? "active" : ""}
            onClick={() => setRole("mentor")}
          >
            Mentor
          </button>
          <button
            className={role === "mentee" ? "active" : ""}
            onClick={() => setRole("mentee")}
          >
            Mentee
          </button>
        </div>

        {/* If Mentee */}
        {role === "mentee" ? (
          !menteeData ? (
            <MenteeAuthentication onLogin={setMenteeData} />
          ) : (
            <MenteeApply menteeId={menteeData.menteeId} />
          )
        ) : (
          <>
            {/* Mode Tabs */}
            <div className="mode-tabs">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={mode === "register" ? "active" : ""}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>

            {/* Mentor Auth Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">
                {mode === "login" ? "Login" : "Register"}
              </button>
            </form>
          </>
        )}

        {/* Mentorship Opportunities */}
        {role === "mentor" && (
          <div className="opportunities-list">
            <h2>Mentorship Opportunities</h2>
            <ul>
              <li>Femiscope Initiative (Githurai 44, Nairobi)</li>
              <li>
                Passion to Share Foundation – “Gift Her Hands” (Kibera, Nairobi)
              </li>
              <li>Swahiba Networks – Mentorship & Empowerment Program (MEP)</li>
              <li>HOPE for Girls @ VISA</li>
              <li>Mentor Match Kenya</li>
              <li>Center for Mentorship & Counselling</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
