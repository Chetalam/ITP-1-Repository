import React, { useState } from "react";
import ScholarAuthentication from "./ScholarAuthentication";
import ScholarDashboard from "./ScholarDashboard";
import ScholarApply from "./ScholarApply";
import DonorAuthentication from "./DonorAuthentication";
import DonorDashboard from "./DonorDashboard";
import "../../App.css";

export default function ScholarDonorModule() {
  const [activeRole, setActiveRole] = useState("donor"); // "donor" or "scholar"
  const [donorData, setDonorData] = useState(null);
  const [scholarData, setScholarData] = useState(null);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Why Scholarships Matter</h1>
        <p>
          Scholarships empower students to pursue their dreams, overcome financial
          barriers, and achieve academic excellence.
          <br />
          They open doors to new opportunities, foster innovation, and help build a
          brighter future for individuals and communities.
          <br />
          Through support and opportunity, donors help scholars unlock their full
          potential and contribute to society.
          <br />
          Whether you are starting your journey or aiming higher, a scholarship can
          make a meaningful difference.
          <br />
          Scholarships also promote equality, diversity, and the advancement of
          underrepresented groups in education.
        </p>

        <h2>Real Scholarship Experience</h2>
        <img
          src="/images/Ambassadorsgirlsscholarshipprogramme.jpg"
          alt="Scholarship Session"
          className="picture"
        />
        <p className="story">
          Many girls have been able to continue their education and transform their
          lives thanks to generous donors and scholarship programs in Kenya.
        </p>

        {/* Available Donors */}
        <h2>Available Donors</h2>
        {/* You can add a donors list here if you have one, similar to trainers/mentors */}
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Scholarship Opportunities at the top */}
        <div className="opportunities-list">
          <h2>Scholarship Opportunities</h2>
          <ul>
            <li>
              <a href="#">NGAAF Scholarship Program (Kenya)</a>
            </li>
            <li>
              <a href="#">Maarifa Foundation Scholarships</a>
            </li>
            <li>
              <a href="#">Maasai Girls Education Fund</a>
            </li>
            <li>
              <a href="#">Equity Wings to Fly Scholarship</a>
            </li>
            <li>
              <a href="#">KCB Foundation Scholarship</a>
            </li>
            <li>
              <a href="#">Kenya Education Fund</a>
            </li>
          </ul>
        </div>
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === "donor" ? "active" : ""}
            onClick={() => setActiveRole("donor")}
          >
            Donor
          </button>
          <button
            className={activeRole === "scholar" ? "active" : ""}
            onClick={() => setActiveRole("scholar")}
          >
            Scholar
          </button>
        </div>
        {/* Authentication / Dashboard */}
        {activeRole === "donor" ? (
          donorData ? (
            <DonorDashboard donorId={donorData.donorId} />
          ) : (
            <DonorAuthentication onLogin={setDonorData} />
          )
        ) : scholarData ? (
          <>
            <ScholarDashboard scholarId={scholarData.scholarId} />
            <ScholarApply scholarId={scholarData.scholarId} />
          </>
        ) : (
          <ScholarAuthentication onLogin={setScholarData} />
        )}
      </div>
    </div>
  );
}
