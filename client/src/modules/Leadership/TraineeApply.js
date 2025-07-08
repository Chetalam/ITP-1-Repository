import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TraineeApply = ({ traineeId }) => {
  const [trainers, setTrainers] = useState([]);
  const [trainerId, setTrainerId] = useState('');

  // Fetch trainers list on mount
  useEffect(() => {
    const fetchTrainers = async () => {
      const res = await axios.get('/api/trainers');
      setTrainers(res.data);
    };
    fetchTrainers();
  }, []);

  const handleApply = async () => {
    if (!trainerId) {
      alert('Please select a trainer.');
      return;
    }
    await axios.post(`/api/trainee/${traineeId}/apply`, { trainerId });
    alert('Application submitted!');
  };

  return (
    <div>
      <h3>Apply to a Trainer</h3>
      <select
        value={trainerId}
        onChange={(e) => setTrainerId(e.target.value)}
      >
        <option value="">Select Trainer</option>
        {trainers.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button onClick={handleApply} style={{ marginLeft: '0.5em' }}>
        Apply
      </button>
    </div>
  );
};

export default TraineeApply;
