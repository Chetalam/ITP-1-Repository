import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonorDashboard = ({ donorId }) => {
  const [data, setData] = useState({ scholarCount: 0, scholars: [] });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`/api/donor/${donorId}/dashboard`);
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch donor dashboard:', err);
      }
    };

    fetchDashboard();
  }, [donorId]);

  return (
    <div>
      <h2>Your Donor Dashboard</h2>
      <p>You have sponsored {data.scholarCount} scholars.</p>
      <ul>
        {data.scholars.map((s) => (
          <li key={s.id}>{s.name} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default DonorDashboard;
