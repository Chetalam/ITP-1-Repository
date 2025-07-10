import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainerDashboard = ({ trainerId }) => {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!trainerId) return;
    axios
      .get(`http://localhost/ITP-1-Repository/server/get_trainees_for_trainer.php?trainer_id=${trainerId}`)
      .then((res) => {
        if (res.data.success) setTrainees(res.data.trainees);
        else setError(res.data.message || 'Could not fetch trainees.');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch trainees.');
        setLoading(false);
      });
  }, [trainerId]);

  if (error) return <div className="error">{error}</div>;
  if (loading) return <div>Loading assigned trainees...</div>;

  return (
    <div className="dashboard">
      <h2>Assigned Trainees</h2>
      {trainees.length > 0 ? (
        <ul>
          {trainees.map((trainee) => (
            <li key={trainee.id}>
              <strong>{trainee.name}</strong>
              {trainee.email ? ` (${trainee.email})` : ''}
            </li>
          ))}
        </ul>
      ) : (
        <p>No trainees have applied to you yet.</p>
      )}
    </div>
  );
};

export default TrainerDashboard;
