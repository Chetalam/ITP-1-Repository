// ScholarshipPortal.js
import React, { useState } from "react";
import "../../App.css";

import ScholarAuthentication from "./ScholarAuthentication";
import ScholarApply from "./ScholarApply";
import ScholarshipOfficeAuthentication from "./ScholarshipOfficeAuthentication";
import ScholarshipOfficeDashboard from "./ScholarshipOfficeDashboard";

const ScholarshipPortal = () => {
  const [activeRole, setActiveRole] = useState("scholar"); // "scholar" or "office"
  const [scholarData, setScholarData] = useState(null);
  const [officeData, setOfficeData] = useState(null);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Scholarship Opportunities</h1>
        <p>
          Scholarships empower learners to pursue their dreams by removing financial barriers.
        </p>
        <h2>Real Success Stories</h2>
        <img
          src="/images/Ambassadorsgirlsscholarshipprogramme.jpg"
          alt="Scholarships for young girls"
          className="picture"
        />
        <p className="story">
          This project, funded by USAID through AED, has supported over 6,000 girls to complete their education.
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === "scholar" ? "active" : ""}
            onClick={() => setActiveRole("scholar")}
          >
            Scholar
          </button>
          <button
            className={activeRole === "office" ? "active" : ""}
            onClick={() => setActiveRole("office")}
          >
            Scholarship Office
          </button>
        </div>

        {/* Role Content */}
        {activeRole === "scholar" ? (
          !scholarData ? (
            <ScholarAuthentication onLogin={setScholarData} />
          ) : (
            <ScholarApply scholarId={scholarData.scholarId} />
          )
        ) : !officeData ? (
          <ScholarshipOfficeAuthentication onLogin={setOfficeData} />
        ) : (
          <ScholarshipOfficeDashboard officeId={officeData.officeId} />
        )}
      </div>
    </div>
  );
};

export default ScholarshipPortal;
