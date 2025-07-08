import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScholarApply = ({ scholarId }) => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Fetch available donors
    const fetchDonors = async () => {
      try {
        const res = await axios.get('/api/donor');
        setDonors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonors();
  }, []);

  const handleApply = async () => {
    if (!scholarshipId) {
      alert('Please select a donor to apply.');
      return;
    }
    await axios.post(`/api/scholar/${scholarId}/apply`, { donorId: scholarshipId });
    alert('Application submitted!');
    setScholarshipId('');
  };

  return (
    <div>
      <h3>Assign Yourself to a Donor</h3>
      <select
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
      >
        <option value="">Select a donor</option>
        {donors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default ScholarApply;
