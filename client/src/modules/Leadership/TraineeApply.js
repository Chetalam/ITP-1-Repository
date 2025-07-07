import React, { useState } from 'react';
import axios from 'axios';

const TraineeApply = ({ traineeId }) => {
  const [trainerId, setTrainerId] = useState('');

  const handleApply = async () => {
    await axios.post(`/api/trainee/${traineeId}/apply`, { trainerId });
    alert('Application submitted!');
  };

  return (
    <div>
      <h3>Apply to a Trainer</h3>
      <input
        placeholder="Trainer ID"
        value={trainerId}
        onChange={(e) => setTrainerId(e.target.value)}
      />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default TraineeApply;
