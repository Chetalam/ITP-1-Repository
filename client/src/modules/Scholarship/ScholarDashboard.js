import React, { useEffect, useState } from "react";
import axios from "axios";

const ScholarDashboard = ({ scholarId }) => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("ScholarDashboard scholarId:", scholarId);

    axios
      .get("http://localhost/ITP-1-Repository/server/get_scholar_applications.php", {
        params: { scholar_id: scholarId }
      })
      .then((res) => {
        console.log("API response:", res.data);
        if (res.data.success) {
          setDonors(res.data.donors);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("API Error: " + err.message);
      });
  }, [scholarId]);

  return (
    <div>
      <h2>My Applications</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {donors.length > 0 ? (
        <ul>
          {donors.map((donor) => (
            <li key={donor.id} style={{ marginBottom: '18px', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9' }}>
              <strong>{donor.name}</strong> <span style={{ color: '#555' }}>({donor.email})</span>
              <div style={{ marginTop: '8px' }}>
                <strong>Scholarship Scope:</strong> <span>{donor.description || 'No scholarship scope provided.'}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>You have not applied to any donors yet.</p>
      )}
    </div>
  );
};

export default ScholarDashboard;
