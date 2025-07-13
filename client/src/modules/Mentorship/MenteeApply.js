import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenteeApply = ({ menteeId, onApplied }) => {
  // Removed unused popupMentor variable
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
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h3 style={{ color: '#007bff' }}>Get to know your mentors</h3>
      <div style={{ marginBottom: '24px' }}>
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <div key={mentor.id} style={{ background: '#fff', border: '1px solid #007bff', borderRadius: '8px', padding: '14px', marginBottom: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <strong>Name:</strong> {mentor.name}<br />
              <strong>Email:</strong> {mentor.email}<br />
              <strong>Mentorship Scope:</strong> {mentor.description || 'No mentorship scope provided.'}
            </div>
          ))
        ) : (
          <p>No mentors registered yet.</p>
        )}
      </div>

      <h3 style={{ color: '#007bff', marginTop: '24px' }}>Apply to a Mentor</h3>
      <select
        value={selectedMentor}
        onChange={e => setSelectedMentor(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '16px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option value="">Select a mentor</option>
        {mentors.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <button onClick={handleApply} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 24px', fontSize: '16px', marginBottom: '24px' }}>Apply</button>

      <h4 style={{ color: '#007bff' }}>My Applications</h4>
      {appliedMentors.length > 0 ? (
        <ul>
          {appliedMentors.map((mentor) => (
            <li key={mentor.id} style={{ marginBottom: '12px', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: '#f5f5f5' }}>
              <strong>{mentor.name}</strong> <span style={{ color: '#555' }}>({mentor.email})</span><br />
              <strong>Mentorship Scope:</strong> {mentor.description || 'No mentorship scope provided.'}
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
