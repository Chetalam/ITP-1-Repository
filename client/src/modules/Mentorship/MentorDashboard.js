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
    <div>
      <h2>Your Mentor Dashboard</h2>
      {mentorInfo && (
        <div style={{ background: '#f9f9f9', border: '1px solid #007bff', borderRadius: '8px', padding: '16px', marginBottom: '18px' }}>
          <strong>Name:</strong> {mentorInfo.name}<br />
          <strong>Email:</strong> {mentorInfo.email}<br />
          <strong>Mentorship Scope:</strong> {mentorInfo.description || 'No mentorship scope provided yet.'}
        </div>
      )}
      <h3>Mentees Who Have Applied To You</h3>
      {loading ? (
        <p>Loading mentees...</p>
      ) : mentees.length === 0 ? (
        <p>No mentees have applied yet.</p>
      ) : (
        <ul>
          {mentees.map((mentee) => (
            <li key={mentee.id}>
              {mentee.name} ({mentee.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorDashboard;

