import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainerDashboard = ({ trainerEmail }) => {
  const [trainer, setTrainer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await axios.post('http://localhost/your-backend-folder/get_trainer.php', {
          email: trainerEmail
        });

        if (response.data.success) {
          setTrainer(response.data.trainer);
        } else {
          setError('Trainer not found.');
        }
      } catch (err) {
        setError('Failed to fetch trainer data.');
        console.error(err);
      }
    };

    fetchTrainerData();
  }, [trainerEmail]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!trainer) {
    return <div>Loading trainer details...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {trainer.name}</h2>
      <p>Email: {trainer.email}</p>
      {/* Add more trainer info here if needed */}
      <h3>Trainer Actions</h3>
      <ul>
        <li>View Assigned Trainees</li>
        <li>Upload Training Materials</li>
        <li>Track Progress</li>
      </ul>
    </div>
  );
};

export default TrainerDashboard;
