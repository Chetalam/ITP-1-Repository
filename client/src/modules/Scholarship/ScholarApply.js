// ScholarApply.js
import React, { useState } from "react";
import axios from "axios";

const ScholarApply = ({ scholarId }) => {
  const [scholarshipId, setScholarshipId] = useState("");

  const handleApply = async () => {
    try {
      await axios.post(`/api/scholar/${scholarId}/apply`, { scholarshipId });
      alert("Application submitted!");
      setScholarshipId("");
    } catch (err) {
      console.error("Scholarship application error:", err);
      alert("Could not submit application.");
    }
  };

  return (
    <div>
      <h3>Apply for a Scholarship</h3>
      <input
        placeholder="Scholarship ID"
        value={scholarshipId}
        onChange={(e) => setScholarshipId(e.target.value)}
      />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default ScholarApply;
