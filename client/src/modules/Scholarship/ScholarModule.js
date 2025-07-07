import React, { useState } from "react";
import ScholarAuthentication from "./ScholarAuthentication";
import ScholarApply from "./ScholarApply";

export default function ScholarDonorModule() {
  const [role, setRole] = useState("donor"); // "donor" or "scholar"
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scholarData, setScholarData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${mode} as ${role}:`, { email, password });
    // TODO: Add donor login/register API calls if needed
  };

  return (
    <div className="content">
      <div className="left-section">
        <h1>{role === "donor" ? "Donor Portal" : "Scholar Portal"}</h1>
        <p>
          {role === "donor"
            ? "Donors can log in or register below."
            : "Scholars can register, log in, and apply for scholarships here."}
        </p>
      </div>

      <div className="right-section">
        {/* Role Tabs */}
        <div className="role-tabs">
          <button
            className={role === "donor" ? "active" : ""}
            onClick={() => setRole("donor")}
          >
            Donor
          </button>
          <button
            className={role === "scholar" ? "active" : ""}
            onClick={() => setRole("scholar")}
          >
            Scholar
          </button>
        </div>

        {/* Scholar Section */}
        {role === "scholar" ? (
          !scholarData ? (
            <ScholarAuthentication onLogin={setScholarData} />
          ) : (
            <ScholarApply scholarId={scholarData.scholarId} />
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

            {/* Donor Auth Form */}
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

        {/* Scholarship Opportunities */}
        <div className="opportunities-list">
          <h2>Scholarship Opportunities</h2>
          <ul>
            <li>NGAAF Scholarship Program (Kenya)</li>
            <li>Maarifa Foundation Scholarships</li>
            <li>Maasai Girls Education Fund</li>
            <li>Equity Wings to Fly Scholarship</li>
            <li>KCB Foundation Scholarship</li>
            <li>Kenya Education Fund</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
