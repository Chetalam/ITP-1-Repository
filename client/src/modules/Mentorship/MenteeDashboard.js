import React from "react";

const MenteeDashboard = ({ menteeId }) => {
  // Only show dashboard if menteeId is present (mentee is logged in)
  if (!menteeId) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: '#d9534f' }}>
        <h2>Please log in to view your dashboard.</h2>
      </div>
    );
  }
  return (
    <div>
      {/* Dashboard content goes here. */}
    </div>
  );
};

export default MenteeDashboard;
