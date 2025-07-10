import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenteeApply = ({ menteeId, onApplied }) => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [appliedMentors, setAppliedMentors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/ITP-1-Repository/server/get_mentors.php')
      .then((res) => setMentors(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!menteeId) return;
    axios
      .get('http://localhost/ITP-1-Repository/server/get_mentee_applications.php', { params: { mentee_id: menteeId } })
      .then((res) => {
        if (res.data.success) setAppliedMentors(res.data.mentors);
      })
      .catch((err) => {});
  }, [menteeId, onApplied]);

  const handleApply = async () => {
    if (!selectedMentor) {
      alert('Please select a mentor.');
      return;
    }
    await axios.post('http://localhost/ITP-1-Repository/server/apply_to_mentor.php', {
      mentee_id: menteeId,
      mentor_id: selectedMentor,
    });
    alert('Application submitted!');
    setSelectedMentor('');
    if (onApplied) onApplied();
  };

  return (
    <div>
      <h3>Apply to a Mentor</h3>
      <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
        <option value="">Select a mentor</option>
        {mentors.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} ({m.email})
          </option>
        ))}
      </select>
      <button onClick={handleApply}>Apply</button>
      <h4>Mentors You've Applied To</h4>
      {appliedMentors.length > 0 ? (
        <ul>
          {appliedMentors.map((mentor) => (
            <li key={mentor.id}>
              <strong>{mentor.name}</strong> ({mentor.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not applied to any mentors yet.</p>
      )}
    </div>
  );
};

export default MenteeApply;
