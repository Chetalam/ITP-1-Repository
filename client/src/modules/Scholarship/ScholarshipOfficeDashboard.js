// ScholarshipOfficeDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ScholarshipOfficeDashboard = ({ officeId }) => {
  const [data, setData] = useState({ applicantCount: 0, applicants: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/scholarship-office/${officeId}/dashboard`);
      setData(res.data);
    };
    fetchData();
  }, [officeId]);

  return (
    <div>
      <h2>Scholarship Applications Dashboard</h2>
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

export default ScholarshipOfficeDashboard;
