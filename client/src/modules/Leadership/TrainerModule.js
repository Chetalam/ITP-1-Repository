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
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost/ITP-1-Repository/server/get_trainers.php')
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error(err));
  }, [refreshKey]);

  // After successful registration, refresh the trainers list
  const handleTrainerRegistered = () => setRefreshKey((k) => k + 1);

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
        {/* Trainee: Apply to Trainer & View Applications */}
        {activeRole === 'trainee' && traineeData && (
          <div className="trainee-applications">
            <h3>Apply to a Trainer</h3>
            <ApplyToTrainerSection
              traineeId={traineeData.traineeId}
              trainers={trainers}
            />
            <h3>Trainers You've Applied To</h3>
            <AppliedTrainersList traineeId={traineeData.traineeId} />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Leadership Training Opportunities */}
        <div className="opportunities-list">
          <h2>Leadership Training Opportunities</h2>
          <ul>
            <li><a href="https://woswa.org/">WOSWA (Women Students Mentorship Association)</a></li>
            <li><a href="https://afwag.org/our-network/kenya">Alliance for Women & Girls – Samburu Girls Foundation</a></li>
            <li><a href="https://afwag.org/our-network/kenya">Pendo Tendo Initiative (Kajiado) (Part of AFWAG network)</a></li>
            <li><a href="https://www.seedsofhopeke.org/">Seeds of Hope Kenya (Kisii & Nyamira)</a></li>
            <li><a href="https://www.thriveforchange.org/regional-outreach-kenya#:~:text=overview%20of%20thrive%20outreach&text=With%20relevant%20sponsorship%2C%20THRIVE%20plans,society%20(or%20regional%20government).">THRIVE for Change – Regional Outreach (Turkana, Lamu, Kilifi)</a></li>
          </ul>
        </div>
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

        {/* Authentication / Dashboard */}
        {activeRole === 'trainer' ? (
          trainerData ? (
            <TrainerDashboard trainerId={trainerData.trainerId} />
          ) : (
            <TrainerAuthentication onLogin={setTrainerData} onRegister={handleTrainerRegistered} />
          )
        ) : traineeData ? (
          <TraineeApply 
            traineeId={traineeData.traineeId} 
            trainers={trainers} 
            onApplied={() => setRefreshKey((k) => k + 1)}
          />
        ) : (
          <TraineeAuthentication onLogin={setTraineeData} />
        )}
      </div>
    </div>
  );
};

function ApplyToTrainerSection({ traineeId, trainers }) {
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [status, setStatus] = useState('');

  const handleApply = () => {
    if (!selectedTrainer) return;
    axios
      .post('http://localhost/ITP-1-Repository/server/apply_to_trainer.php', {
        trainee_id: traineeId,
        trainer_id: selectedTrainer,
      })
      .then((res) => {
        setStatus(res.data.success ? 'Application sent!' : res.data.message || 'Error');
      })
      .catch(() => setStatus('Error applying.'));
  };

  return (
    <div>
      <select
        value={selectedTrainer}
        onChange={(e) => setSelectedTrainer(e.target.value)}
      >
        <option value="">Select a trainer</option>
        {trainers.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
      <button onClick={handleApply} disabled={!selectedTrainer}>
        Apply
      </button>
      {status && <div className="status-message">{status}</div>}
    </div>
  );
}

function AppliedTrainersList({ traineeId }) {
  const [applied, setApplied] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost/ITP-1-Repository/server/get_trainee_applications.php?trainee_id=${traineeId}`)
      .then((res) => {
        setApplied(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [traineeId]);

  if (loading) return <div>Loading...</div>;
  if (!applied.length) return <div>No applications yet.</div>;
  return (
    <ul>
      {applied.map((trainer) => (
        <li key={trainer.id}>{trainer.name}</li>
      ))}
    </ul>
  );
}

export default TrainerModule;
