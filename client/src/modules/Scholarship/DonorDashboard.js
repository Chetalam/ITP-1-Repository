import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonorDashboard = ({ donorId }) => {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  console.log('Donor ID:', donorId); // <--- THIS will print to your browser console

  if (!donorId) return;

  setLoading(true);
  axios
    .get('http://localhost/ITP-1-Repository/server/get_scholars_for_donor.php', {
      params: { donor_id: donorId }
    })
    .then((res) => {
      setScholars(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Failed to fetch scholars:', err);
      setLoading(false);
    });
}, [donorId]);

  return (
    <div>
      <h2>Your Donor Dashboard</h2>
      {loading ? (
        <p>Loading scholars...</p>
      ) : scholars.length === 0 ? (
        <p>No scholars have applied yet.</p>
      ) : (
        <ul>
          {scholars.map((s) => (
            <li key={s.id}>
              {s.name} ({s.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonorDashboard;
