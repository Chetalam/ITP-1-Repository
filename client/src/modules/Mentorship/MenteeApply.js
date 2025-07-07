import React, { useState } from 'react';
import axios from 'axios';

const MenteeApply = ({ menteeId }) => {
  const [mentorId, setMentorId] = useState('');

  const handleApply = async () => {
    await axios.post(`/api/mentee/${menteeId}/apply`, { mentorId });
    alert('Application submitted!');
  };

  return (
    <div>
      <h3>Apply to a Mentor</h3>
      <input
        placeholder="Mentor ID"
        value={mentorId}
        onChange={(e) => setMentorId(e.target.value)}
      />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default MenteeApply;
