import React, { useEffect, useState } from "react";
import axios from "axios";

const MenteeDashboard = ({ menteeId, refreshKey }) => {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!menteeId) return;
    axios
      .get("http://localhost/ITP-1-Repository/server/get_mentee_applications.php", { params: { mentee_id: menteeId } })
      .then((res) => {
        if (res.data.success) {
          setMentors(res.data.mentors);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError("API Error: " + err.message);
      });
  }, [menteeId, refreshKey]);

  return (
    <div>
      <h2>My Applications</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {mentors.length > 0 ? (
        <ul>
          {mentors.map((mentor) => (
            <li key={mentor.id}>
              <strong>{mentor.name}</strong> ({mentor.email})
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>You have not applied to any mentors yet.</p>
      )}
    </div>
  );
};

export default MenteeDashboard;
