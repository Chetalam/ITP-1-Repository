import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorDashboard = ({ mentorId }) => {
  const [mentorInfo, setMentorInfo] = useState(null);
  const [mentees, setMentees] = useState([]);
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
        setError("Failed to fetch mentor data");
        setLoading(false);
      }
    };

    const fetchMentees = async () => {
      try {
        const res = await axios.get(`http://localhost/ITP-1-Repository/server/get_mentees_for_mentor.php`, { params: { mentor_id: mentorId } });
        if (res.data.success) setMentees(res.data.mentees);
      } catch (err) {
        // Optionally handle mentee fetch error
      }
    };

    fetchMentorData();
    fetchMentees();
  }, [mentorId]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {mentorInfo.name}</h2>
      <p>Email: {mentorInfo.email}</p>
      <p>You have {mentorInfo.mentee_count || 0} mentees.</p>
      <h3>Your Mentees</h3>
      {mentees.length > 0 ? (
        <ul>
          {mentees.map((mentee) => (
            <li key={mentee.id}>
              <strong>{mentee.name}</strong> ({mentee.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No mentees have applied yet.</p>
      )}
    </div>
  );
};

export default MentorDashboard;

