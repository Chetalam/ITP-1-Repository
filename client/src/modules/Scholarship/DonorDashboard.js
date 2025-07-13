import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonorDashboard = ({ donorId }) => {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donorDetails, setDonorDetails] = useState(null);

  useEffect(() => {
  console.log('Donor ID:', donorId); // <--- THIS will print to your browser console

  if (!donorId) return;

  setLoading(true);
  // Fetch donor details
  axios
    .get('http://localhost/ITP-1-Repository/server/get_donors.php')
    .then((res) => {
      const donor = Array.isArray(res.data)
        ? res.data.find((d) => String(d.id) === String(donorId))
        : null;
      setDonorDetails(donor || null);
    });
  // Fetch scholars who applied
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
      {donorDetails && (
        <div style={{ background: '#f9f9f9', border: '1px solid #007bff', borderRadius: '8px', padding: '16px', marginBottom: '18px' }}>
          <strong>Name:</strong> {donorDetails.name}<br />
          <strong>Email:</strong> {donorDetails.email}<br />
          <strong>Scholarship Scope:</strong> {donorDetails.description || 'No scholarship scope provided.'}
        </div>
      )}
      <h3>Scholars Who Have Applied To You</h3>
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
