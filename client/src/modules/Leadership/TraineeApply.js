import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TraineeApply = ({ traineeId, trainers = [], onApplied, name, email }) => {
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [appliedTrainers, setAppliedTrainers] = useState([]);
  const [status, setStatus] = useState('');

  // Fetch applied trainers for this trainee
  useEffect(() => {
    if (!traineeId) return;
    axios
      .get(`http://localhost/ITP-1-Repository/server/get_trainee_applications.php?trainee_id=${traineeId}`)
      .then((res) => {
        if (res.data.success) setAppliedTrainers(res.data.trainers);
        else setAppliedTrainers([]);
      })
      .catch(() => setAppliedTrainers([]));
  }, [traineeId, onApplied]);

  const handleApply = async () => {
    if (!selectedTrainer) {
      alert('Please select a trainer.');
      return;
    }
    try {
      const res = await axios.post('http://localhost/ITP-1-Repository/server/apply_to_trainer.php', {
        trainee_id: traineeId,
        trainer_id: selectedTrainer,
      });
      setStatus(res.data.success ? 'Application submitted!' : res.data.message || 'Error');
      setSelectedTrainer('');
      if (onApplied) onApplied();
    } catch (e) {
      setStatus('Error applying.');
    }
  };

  return (
    <div>
      {traineeId && name && email && (
        <div className="user-info">
          <h4>Welcome, {name}!</h4>
          <p>Email: {email}</p>
        </div>
      )}
      <h3>Apply to a Trainer</h3>
      <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
        <option value="">Select a trainer</option>
        {trainers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name} {t.email ? `(${t.email})` : ''}
          </option>
        ))}
      </select>
      <button onClick={handleApply}>Apply</button>
      {status && <div className="status-message">{status}</div>}
      <h4>Trainers You've Applied To</h4>
      {appliedTrainers.length > 0 ? (
        <ul>
          {appliedTrainers.map((trainer) => (
            <li key={trainer.id}>
              <strong>{trainer.name}</strong> {trainer.email ? `(${trainer.email})` : ''}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not applied to any trainers yet.</p>
      )}
    </div>
  );
};

export default TraineeApply;
