// LeadershipPortal.js
import React, { useState } from "react";
import "../../App.css";

import LeaderAuthentication from "./LeaderAuthentication";
import LeadershipDashboard from "./LeadershipDashboard";
import LeadershipParticipantAuthentication from "./LeadershipParticipantAuthentication";
import ParticipantApply from "./ParticipantApply";

const LeadershipPortal = () => {
  const [activeRole, setActiveRole] = useState("participant"); // "leader" or "participant"
  const [leaderData, setLeaderData] = useState(null);
  const [participantData, setParticipantData] = useState(null);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Leadership Training Opportunities</h1>
        <p>
          Leadership transforms communities by empowering individuals to make positive change.
        </p>
        <h2>Inspirational Story</h2>
        <img
          src="/images/Maasaiwomanandstudents.jpg"
          alt="Kenyan rebel evades child marriage and Maasai curses to win power"
          className="picture"
        />
        <p className="story">
          After outmaneuvering her father to avoid child marriage, Peris Tobiko became a leader to protect other Maasai girls.
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === "participant" ? "active" : ""}
            onClick={() => setActiveRole("participant")}
          >
            Participant
          </button>
          <button
            className={activeRole === "leader" ? "active" : ""}
            onClick={() => setActiveRole("leader")}
          >
            Leader
          </button>
        </div>

        {/* Role Content */}
        {activeRole === "participant" ? (
          !participantData ? (
            <LeadershipParticipantAuthentication onLogin={setParticipantData} />
          ) : (
            <ParticipantApply participantId={participantData.participantId} />
          )
        ) : !leaderData ? (
          <LeaderAuthentication onLogin={setLeaderData} />
        ) : (
          <LeadershipDashboard leaderId={leaderData.leaderId} />
        )}
      </div>
    </div>
  );
};

export default LeadershipPortal;
