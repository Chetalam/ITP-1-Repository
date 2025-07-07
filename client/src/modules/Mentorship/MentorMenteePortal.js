import React, { useState } from "react";
import "../../App.css";

import MentorAuthentication from "./MentorAuthentication";
import MentorDashboard from "./MentorDashboard";

import MenteeAuthentication from "./MenteeAuthentication";
import MenteeApply from "./MenteeApply";

const MentorMenteePortal = () => {
  const [activeRole, setActiveRole] = useState("mentor"); // "mentor" or "mentee"
  const [mentorData, setMentorData] = useState(null);
  const [menteeData, setMenteeData] = useState(null);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Why Mentorship Matters</h1>
        <p>
          Mentorship fosters growth, learning, and empowerment for both mentors and mentees.
        </p>
        <h2>Real Mentorship Experience</h2>
        <img
          src="/images/Solidarityfortheadvancementofwomensagenda.jpg"
          alt="Mentorship Session"
          className="picture"
        />
        <p className="story">
          Four girls were admitted into a two-month training at SAWA in 2012. They learned communication, health, and career skills that empowered them.
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Top Role Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === "mentor" ? "active" : ""}
            onClick={() => setActiveRole("mentor")}
          >
            Mentor
          </button>
          <button
            className={activeRole === "mentee" ? "active" : ""}
            onClick={() => setActiveRole("mentee")}
          >
            Mentee
          </button>
        </div>

        {/* Show authentication */}
        {activeRole === "mentor" ? (
          !mentorData ? (
            <MentorAuthentication onLogin={setMentorData} />
          ) : (
            <MentorDashboard mentorId={mentorData.mentorId} />
          )
        ) : (
          !menteeData ? (
            <MenteeAuthentication onLogin={setMenteeData} />
          ) : (
            <MenteeApply menteeId={menteeData.menteeId} />
          )
        )}
      </div>
    </div>
  );
};

export default MentorMenteePortal;
