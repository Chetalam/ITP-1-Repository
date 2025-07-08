import React, { useState, useEffect } from "react";
import "../../App.css";

import TrainerAuthentication from "./TrainerAuthentication";
import TrainerDashboard from "./TrainerDashboard";

import TraineeAuthentication from "./TraineeAuthentication";
import TraineeApply from "./TraineeApply";

import axios from "axios";

const TrainerTraineePortal = () => {
  const [activeRole, setActiveRole] = useState("trainer"); // "trainer" or "trainee"
  const [trainerData, setTrainerData] = useState(null);
  const [traineeData, setTraineeData] = useState(null);
  const [trainers, setTrainers] = useState([]);

  // Load trainers if trainee logs in
  useEffect(() => {
    if (traineeData) {
      const fetchTrainers = async () => {
        const res = await axios.get("/api/trainers");
        setTrainers(res.data);
      };
      fetchTrainers();
    }
  }, [traineeData]);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Why Training Matters</h1>
        <p>
          Training fosters growth, learning, and empowerment for both trainers and trainees.
        </p>
        <h2>Real Training Experience</h2>
        <img
          src="/images/Maasaiwomanandstudents.jpg"
          alt="Training Session"
          className="picture"
        />
        <p className="story">
          Kenyan rebel evades child marriage and Maasai curses to win power. After outmaneuvering her illiterate father three times by the age of 18 to escape his plans to make her a child bride, Peris Tobiko decided the only way to protect other Maasai girls in Kenya from harmful traditions was to become a leader.
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Top Role Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === "trainer" ? "active" : ""}
            onClick={() => setActiveRole("trainer")}
          >
            Trainer
          </button>
          <button
            className={activeRole === "trainee" ? "active" : ""}
            onClick={() => setActiveRole("trainee")}
          >
            Trainee
          </button>
        </div>

        {/* Show authentication or dashboard */}
        {activeRole === "trainer" ? (
          !trainerData ? (
            <TrainerAuthentication onLogin={setTrainerData} />
          ) : (
            <TrainerDashboard trainerId={trainerData.trainerId} />
          )
        ) : (
          !traineeData ? (
            <TraineeAuthentication onLogin={setTraineeData} />
          ) : (
            // Pass trainers as prop
            <TraineeApply
              traineeId={traineeData.traineeId}
              trainers={trainers}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TrainerTraineePortal;
