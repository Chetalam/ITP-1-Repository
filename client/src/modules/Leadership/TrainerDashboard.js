import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainerDashboard = ({ trainerId }) => {
  const [data, setData] = useState({ traineeCount: 0, trainees: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/trainer/${trainerId}/dashboard`);
      setData(res.data);
    };
    fetchData();
  }, [trainerId]);

  return (
    <div>
      <h2>Your Trainer Dashboard</h2>
      <p>You have {data.traineeCount} trainees.</p>
      <ul>
        {data.trainees.map((t) => (
          <li key={t.id}>{t.name} ({t.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainerDashboard;
