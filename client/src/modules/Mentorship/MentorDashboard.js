import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorDashboard = ({ mentorId }) => {
  const [mentorInfo, setMentorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mentorId) {
      setError("No mentor ID provided");
      return;
    }

    const fetchMentorData = async () => {
      try {
        const res = await axios.get(`http://localhost/ITP-1-Repository/server/get_mentor_data.php?id=${mentorId}`);
        setMentorInfo(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch mentor data");
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [mentorId]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {mentorInfo.name}</h2>
      <p>Email: {mentorInfo.email}</p>
      <p>You have {mentorInfo.mentee_count || 0} mentees.</p>
      {/* Add more mentor details or features here */}
    </div>
  );
};

export default MentorDashboard;

