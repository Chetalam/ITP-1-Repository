import React, { useEffect, useState } from 'react';

export default function MenteeApplyToMentor({ menteeId }) {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/mentors')
      .then(res => res.json())
      .then(setMentors);
  }, []);

  const handleApply = async e => {
    e.preventDefault();
    if (!selectedMentor) return;
    const res = await fetch(`/api/mentee/${menteeId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mentorId: selectedMentor }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <form onSubmit={handleApply}>
      <label>Select a Mentor:</label>
      <select value={selectedMentor} onChange={e => setSelectedMentor(e.target.value)} required>
        <option value="">-- Choose Mentor --</option>
        {mentors.map(m => (
          <option key={m.id} value={m.id}>
            {m.name} {m.description ? `| ${m.description}` : ' (No mentorship scope provided)'}
          </option>
        ))}
      </select>
      <button type="submit">Apply</button>
      {message && <div>{message}</div>}
    </form>
  );
}
