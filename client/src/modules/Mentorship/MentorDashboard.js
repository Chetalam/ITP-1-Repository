import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorDashboard = ({ mentorId }) => {
  const [data, setData] = useState({ menteeCount: 0, mentees: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/mentor/${mentorId}/dashboard`);
      setData(res.data);
    };
    fetchData();
  }, [mentorId]);

  return (
    <div>
      <h2>Your Dashboard</h2>
      <p>You have {data.menteeCount} mentees.</p>
      <ul>
        {data.mentees.map((m) => (
          <li key={m.id}>{m.name} ({m.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default MentorDashboard;
