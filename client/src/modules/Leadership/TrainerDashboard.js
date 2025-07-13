import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainerDashboard = ({ trainerId }) => {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trainerDetails, setTrainerDetails] = useState(null);

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
    // Fetch trainer details
    axios
      .get(`http://localhost/ITP-1-Repository/server/get_trainer_server.php?trainer_id=${trainerId}`)
      .then((res) => {
        if (res.data.success) setTrainerDetails(res.data.trainer);
      })
      .catch(() => {});
  }, [trainerId]);

  if (error) return <div className="error">{error}</div>;
  if (loading) return <div>Loading assigned trainees...</div>;

  return (
    <div>
      <h2>Your Trainer Dashboard</h2>
      {trainerDetails && (
        <div style={{ background: '#f9f9f9', border: '1px solid #1976d2', borderRadius: '8px', padding: '16px', marginBottom: '18px', maxWidth: 500, margin: '0 auto' }}>
          <strong>Name:</strong> {trainerDetails.name}<br />
          <strong>Email:</strong> {trainerDetails.email}<br />
          <strong>Leadership Scope:</strong> {trainerDetails.description || 'No leadership scope provided.'}
        </div>
      )}
      <h3>Trainees Who Have Applied To You</h3>
      {loading ? (
        <p>Loading trainees...</p>
      ) : trainees.length === 0 ? (
        <p>No trainees have applied yet.</p>
      ) : (
        <ul style={{ maxWidth: 500, margin: '0 auto', background: '#f7f7f7', borderRadius: 8, padding: 16, border: '1px solid #eee' }}>
          {trainees.map((trainee) => (
            <li key={trainee.id}>
              {trainee.name} {trainee.email ? `(${trainee.email})` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainerDashboard;
