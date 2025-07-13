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
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {traineeId && name && email && (
        <div className="user-info" style={{ marginBottom: '18px' }}>
          <h4 style={{ color: '#1976d2' }}>Welcome, {name}!</h4>
          <p>Email: {email}</p>
        </div>
      )}
      <h3 style={{ color: '#1976d2' }}>Get to know your trainers</h3>
      <div style={{ marginBottom: '24px' }}>
        {trainers.length > 0 ? (
          trainers.map((trainer) => (
            <div key={trainer.id} style={{ background: '#fff', border: '1px solid #1976d2', borderRadius: '8px', padding: '14px', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <strong>Name:</strong> {trainer.name}<br />
              <strong>Leadership Scope:</strong> {trainer.description || 'No leadership scope provided.'}
            </div>
          ))
        ) : (
          <p>No trainers registered yet.</p>
        )}
      </div>

      <h3 style={{ color: '#1976d2', marginTop: '24px' }}>Apply to a Trainer</h3>
      <select
        value={selectedTrainer}
        onChange={(e) => setSelectedTrainer(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '16px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option value="">Select a trainer</option>
        {trainers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button onClick={handleApply} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#1976d2', color: '#fff', fontWeight: 'bold', fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: '18px' }}>Apply</button>
      {status && <div className="status-message" style={{ color: status.includes('Error') ? 'red' : 'green', marginBottom: '18px' }}>{status}</div>}

      <h3 style={{ color: '#1976d2' }}>Trainers You've Applied To</h3>
      {appliedTrainers.length > 0 ? (
        <ul>
          {appliedTrainers.map((trainer) => (
            <li key={trainer.id} style={{ marginBottom: '18px', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9' }}>
              <strong>{trainer.name}</strong> <span style={{ color: '#555' }}>({trainer.email})</span>
              <div style={{ marginTop: '8px' }}>
                <strong>Leadership Scope:</strong> <span>{trainer.description || 'No leadership scope provided.'}</span>
              </div>
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
