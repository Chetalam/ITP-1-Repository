import React, { useEffect, useState } from 'react';
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
    <div>
      <h3>Apply to a Donor</h3>
      <select
        value={donorId}
        onChange={(e) => setDonorId(e.target.value)}
      >
        <option value="">Select a donor</option>
        {donors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name} ({d.email})
          </option>
        ))}
      </select>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default ScholarApply;
