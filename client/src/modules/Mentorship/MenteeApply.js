import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenteeApply = ({ menteeId }) => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');

  useEffect(() => {
    axios.get('/api/mentors')
      .then(res => setMentors(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApply = async () => {
    if (!selectedMentor) {
      alert('Please select a mentor.');
      return;
    }
    await axios.post(`/api/mentee/${menteeId}/apply`, { mentorId: selectedMentor });
    alert('Application submitted!');
  };

  return (
    <div>
      <h3>Apply to a Mentor</h3>
      <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
        <option value="">-- Select a Mentor --</option>
        {mentors.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default MenteeApply;
