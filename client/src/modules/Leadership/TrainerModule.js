import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import TrainerAuthentication from './TrainerAuthentication';
import TraineeAuthentication from './TraineeAuthentication';
import TrainerDashboard from './TrainerDashboard';
import TraineeApply from './TraineeApply';

const TrainerModule = () => {
  const [activeRole, setActiveRole] = useState('trainer'); // "trainer" or "trainee"
  const [trainerData, setTrainerData] = useState(null);
  const [traineeData, setTraineeData] = useState(null);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/trainers')
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="content">
      {/* Left Section */}
      <div className="left-section">
        <h1>Why Training Matters</h1>
        <p>
          Training is a powerful way to support growth, learning, and personal development.<br />
          Through guidance, encouragement, and experience-sharing, trainers help individuals build confidence, navigate challenges, and reach their goals.<br />
          Whether you are starting your journey or aiming higher, having a trainer can make a meaningful difference.
        </p>

        <h2>Real Training Experience</h2>
        <img
          src="/images/Maasaiwomanandstudents.jpg"
          alt="Training Session"
          className="picture"
        />
        <p className="story">
          Kenyan rebel evades child marriage and Maasai curses to win power After outmaneuvering her illiterate father three times by the age of 18 to escape his plans to make her a child bride, Peris Tobiko decided the only way to protect other Maasai girls in Kenya from harmful traditions was to become a leader
        </p>

        {/* Available Trainers */}
        <h2>Available Trainers</h2>
        {trainers.length > 0 ? (
          <ul>
            {trainers.map((t) => (
              <li key={t.id}>{t.name}</li>
            ))}
          </ul>
        ) : (
          <p>No trainers available at the moment.</p>
        )}
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={activeRole === 'trainer' ? 'active' : ''}
            onClick={() => setActiveRole('trainer')}
          >
            Trainer
          </button>
          <button
            className={activeRole === 'trainee' ? 'active' : ''}
            onClick={() => setActiveRole('trainee')}
          >
            Trainee
          </button>
        </div>

        {/* Training Opportunities */}
        <h1>Training Opportunities</h1>
        <ul className="mentorship-list">
          <li>
            <a href="https://femiscope.org/" target="_blank" rel="noopener noreferrer">
              Femiscope Initiative (Githurai 44, Nairobi)
            </a>
          </li>
          <li>
            <a href="https://passiontosharefoundation.org/mentorship-program/" target="_blank" rel="noopener noreferrer">
              Passion to Share Foundation – “Gift Her Hands” (Kibera, Nairobi)
            </a>
          </li>
          <li>
            <a href="https://swahiba.org/mentorship-empowerment-program/" target="_blank" rel="noopener noreferrer">
              Swahiba Networks – Mentorship & Empowerment Program (MEP)
            </a>
          </li>
          <li>
            <a href="https://hopeforgirls.or.ke/mentorship/" target="_blank" rel="noopener noreferrer">
              HOPE for Girls @ VISA
            </a>
          </li>
          <li>
            <a href="https://mentormatchkenya.com/" target="_blank" rel="noopener noreferrer">
              Mentor Match Kenya
            </a>
          </li>
          <li>
            <a href="https://www.centerformentorship.co.ke/" target="_blank" rel="noopener noreferrer">
              Center for Mentorship & Counselling
            </a>
          </li>
        </ul>

        {/* Authentication / Dashboard */}
        {activeRole === 'trainer' ? (
          trainerData ? (
            <TrainerDashboard trainerId={trainerData.trainerId} />
          ) : (
            <TrainerAuthentication onLogin={setTrainerData} />
          )
        ) : traineeData ? (
          <TraineeApply traineeId={traineeData.traineeId} />
        ) : (
          <TraineeAuthentication onLogin={setTraineeData} />
        )}
      </div>
    </div>
  );
};

export default TrainerModule;
