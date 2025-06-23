import React from 'react';
import '../../App.css';

const ScholarshipModule = () => {
  return (
    <>
      {/* Main Content Wrapper */}
      <div className="content">
        
        {/* Left Section: Introduction & Success Story */}
        <div className="left-section">
          <h1>Scholarships for Women</h1>
          <p>
            Scholarships can open doors to educational and professional growth.<br />
            They help eliminate financial barriers, making it possible for deserving students to pursue their dreams.<br />
            Whether it's tuition, living expenses, or study resources, scholarships ease the burden and create pathways to success.<br />
            Take a step toward your future by exploring and applying for available opportunities.
          </p>

          {/* Scholarship Success Story */}
          <h2>Success Story</h2>
          <img
            src="/images/scholarship.jpg"  // ✅ Replace with actual image path
            alt="Student Receiving Scholarship"
            className="picture"
          />
          <p className="story">
            Fatima, a bright student from a remote area, secured a full scholarship to study computer science.
            Today, she mentors other girls in her community and works at a top tech company.
            Her journey shows that with support, dreams are truly achievable.
          </p>
        </div>

        {/* Right Section: Scholarship Links */}
        <div className="right-section">
          <h1>Available Scholarships</h1>
          <ul className="scholarship-list">
            <li><a href="https://example.com/scholarship1" target="_blank" rel="noopener noreferrer">Undergraduate Women in Tech Scholarship</a></li>
            <li><a href="https://example.com/scholarship2" target="_blank" rel="noopener noreferrer">STEM Excellence Grant for Girls</a></li>
            <li><a href="https://example.com/scholarship3" target="_blank" rel="noopener noreferrer">Community Leaders Academic Fund</a></li>
            <li><a href="https://example.com/scholarship4" target="_blank" rel="noopener noreferrer">International Education Support Scholarship</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ScholarshipModule;
