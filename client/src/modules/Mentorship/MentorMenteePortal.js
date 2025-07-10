import React, { useState } from "react";
import "../../App.css";
import MentorAuthentication from "./MentorAuthentication";
import MentorDashboard from "./MentorDashboard";
import MenteeAuthentication from "./MenteeAuthentication";
import MenteeApply from "./MenteeApply";
import MenteeDashboard from "./MenteeDashboard";

const MentorMenteeModule = () => {
  const [role, setRole] = useState("mentor"); // "mentor" or "mentee"
  const [mentorData, setMentorData] = useState(null);
  const [menteeData, setMenteeData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleApplied = () => setRefreshKey((k) => k + 1);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>{role === "mentor" ? "Mentor Portal" : "Mentee Portal"}</h1>
        <p>
          {role === "mentor"
            ? "Mentors can log in or register below."
            : "Mentees can register, log in, and apply to a mentor here."}
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Mentorship Opportunities at the top */}
        <div className="opportunities-list">
          <h2>Mentorship Opportunities</h2>
          <ul>
            <li>Center for Mentorship & Counselling</li>
            <li>SAWA Girls Empowerment Program</li>
            <li>Equity Group Mentorship</li>
            <li>Kenya Women Mentorship Network</li>
            <li>Akili Dada Young Women Leaders</li>
            <li>MentorNet Africa</li>
            <li>Global Give Back Circle</li>
          </ul>
        </div>
        {/* Role Tabs directly below opportunities */}
        <div className="role-tabs" style={{ marginTop: '0.5rem' }}>
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
        {/* Auth and dashboard below role tabs */}
        {role === "mentor" ? (
          mentorData ? (
            <MentorDashboard mentorId={mentorData.mentorId} />
          ) : (
            <MentorAuthentication onLogin={setMentorData} />
          )
        ) : (
          // Mentee Section: Always show authentication
          <>
            <MenteeAuthentication onLogin={setMenteeData} />
            {menteeData && (
              <>
                <MenteeDashboard menteeId={menteeData.menteeId} refreshKey={refreshKey} />
                <MenteeApply menteeId={menteeData.menteeId} onApplied={handleApplied} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MentorMenteeModule;
