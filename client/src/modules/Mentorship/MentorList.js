import React, { useEffect, useState } from 'react';

export default function MentorList() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch('/api/mentors')
      .then(res => res.json())
      .then(setMentors);
  }, []);

  return (
    <div>
      <h2>Available Mentors</h2>
      <select>
        {mentors.map(m => (
          <option key={m.id} value={m.id}>
            {m.name} | {m.email} | {m.description}
          </option>
        ))}
      </select>
    </div>
  );
}
