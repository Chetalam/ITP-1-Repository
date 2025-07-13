import React, { useEffect, useState } from 'react';
import ScholarDashboard from './ScholarDashboard';
import axios from 'axios';

const ScholarApply = ({ scholarId }) => {
  const [donorId, setDonorId] = useState('');
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Fetch available donors
    axios
      .get('http://localhost/ITP-1-Repository/server/get_donors.php')
      .then((res) => setDonors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleApply = async () => {
    if (!donorId) {
      alert('Please select a donor.');
      return;
    }

    await axios.post('http://localhost/ITP-1-Repository/server/apply_to_donor.php', {
      scholar_id: scholarId,
      donor_id: donorId,
    });

    alert('Application submitted!');
    setDonorId('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h3 style={{ color: '#007bff' }}>Get to know your donors</h3>
      <div style={{ marginBottom: '24px' }}>
        {donors.length > 0 ? (
          donors.map((donor) => (
            <div key={donor.id} style={{ background: '#fff', border: '1px solid #007bff', borderRadius: '8px', padding: '14px', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <strong>Name:</strong> {donor.name}<br />
              <strong>Scholarship Scope:</strong> {donor.description || 'No scholarship scope provided.'}
            </div>
          ))
        ) : (
          <p>No donors registered yet.</p>
        )}
      </div>

      <h3 style={{ color: '#007bff', marginTop: '24px' }}>Apply to a Donor</h3>
      <select
        value={donorId}
        onChange={(e) => setDonorId(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '16px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option value="">Select a donor</option>
        {donors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <button onClick={handleApply} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 24px', fontSize: '16px', marginBottom: '24px' }}>Apply</button>

      <div style={{ marginTop: '8px', padding: '16px', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #eee' }}>
        <ScholarDashboard scholarId={scholarId} />
      </div>
    </div>
  );
};

export default ScholarApply;
