import React, { useState } from "react";
import ScholarAuthentication from "./ScholarAuthentication";
import ScholarDashboard from "./ScholarDashboard";
import ScholarApply from "./ScholarApply";
import DonorAuthentication from "./DonorAuthentication";
import DonorDashboard from "./DonorDashboard";
import "../../App.css";

export default function ScholarDonorModule() {
  const [role, setRole] = useState("donor"); // "donor" or "scholar"
  const [donorData, setDonorData] = useState(null);
  const [scholarData, setScholarData] = useState(null);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>{role === "donor" ? "Donor Portal" : "Scholar Portal"}</h1>
        <p>
          {role === "donor"
            ? "Donors can log in or register below."
            : "Scholars can register, log in, and apply for scholarships here."}
        </p>
      </div>

      {/* Right Section */}
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

        {/* Donor Section */}
        {role === "donor" ? (
          donorData ? (
            <DonorDashboard donorId={donorData.donorId} />
          ) : (
            <DonorAuthentication onLogin={setDonorData} />
          )
        ) : (
          // Scholar Section: Always show authentication
          <>
            <ScholarAuthentication onLogin={setScholarData} />
            {scholarData && (
              <>
                <ScholarDashboard scholarId={scholarData.scholarId} />
                <ScholarApply scholarId={scholarData.scholarId} />
              </>
            )}
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
