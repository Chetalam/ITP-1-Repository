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
      {/* My Applications block removed as requested. */}
    </div>
  );
};

export default MenteeDashboard;
