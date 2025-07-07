// LeadershipDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const LeadershipDashboard = ({ leaderId }) => {
  const [data, setData] = useState({ applicantCount: 0, applicants: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/leader/${leaderId}/dashboard`);
      setData(res.data);
    };
    fetchData();
  }, [leaderId]);

  return (
    <div>
      <h2>Leadership Applications Dashboard</h2>
      <p>You have {data.applicantCount} applications.</p>
      <ul>
        {data.applicants.map((a) => (
          <li key={a.id}>
            {a.name} ({a.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadershipDashboard;
