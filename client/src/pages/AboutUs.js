import React, { useState, useEffect } from 'react';

function AboutUs() {
  // Impact counters
  const [mentored, setMentored] = useState(0);
  const [scholarships, setScholarships] = useState(0);
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    // Fetch real counts from backend
    fetch('http://localhost:5000/api/impact-counts')
      .then(res => res.json())
      .then(data => {
        setMentored(data.mentored || 0);
        setScholarships(data.scholarships || 0);
        setPartners(data.leaders || 0);
      })
      .catch(() => {
        // fallback to animation if backend fails
        const interval = setInterval(() => {
          setMentored((prev) => (prev < 5000 ? prev + 50 : 5000));
          setScholarships((prev) => (prev < 1200 ? prev + 10 : 1200));
          setPartners((prev) => (prev < 50 ? prev + 1 : 50));
        }, 30);
        return () => clearInterval(interval);
      });
  }, []);

  // FAQ accordion state
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: "Who can join the platform?",
      answer: "Any woman in Kenya, especially those from marginalized communities, is welcome to join."
    },
    {
      question: "How do I apply for an opportunity?",
      answer: "Kindly browse on any section and apply to a mentor, scholarship donor, leadership trainer or even see some of the empowerment opportunities available on the web."
    },
    {
      question: "How can I become a mentor?",
      answer: "Please browse on the mentorship section and register yourself as a mentor."
    }
  ];

  return (
    <div className="page-content">
      <h1>About Us</h1>
      <p>
        We are a passionate team committed to empowering young women, especially those from marginalized communities,
        by bridging the opportunity gap through technology.
      </p>
      <p>
        Every girl deserves a fair chance to learn, grow, and lead. Whether from a rural village or an urban town, we believe
        every young woman should have equal access to resources that help unlock her potential.
      </p>
      <p>
        We collaborate with mentors, educational institutions, and organizations across Kenya and beyond to build a strong
        support system for girls and young women.
      </p>

      {/* Impact Counters */}
      <h2>Our Impact</h2>
      <div style={countersContainer}>
        <div style={counterBox}>
          <h3>{mentored.toLocaleString()}</h3>
          <p>Girls Mentored</p>
        </div>
        <div style={counterBox}>
          <h3>{scholarships.toLocaleString()}</h3>
          <p>Scholarships Awarded</p>
        </div>
        <div style={counterBox}>
          <h3>{partners}</h3>
          <p>Leaders Engaged</p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <h2>Frequently Asked Questions</h2>
      <div style={faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} style={faqItem}>
            <div
              style={faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            {openIndex === index && (
              <div style={faqAnswer}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline styles
const countersContainer = {
  display: "flex",
  justifyContent: "space-around",
  margin: "2rem 0",
  flexWrap: "wrap"
};

const counterBox = {
  textAlign: "center",
  padding: "1rem",
  minWidth: "120px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#f9f9f9",
  margin: "0.5rem"
};

const faqContainer = {
  marginTop: "1.5rem"
};

const faqItem = {
  borderBottom: "1px solid #ccc",
  padding: "0.5rem 0"
};

const faqQuestion = {
  cursor: "pointer",
  fontWeight: "bold"
};

const faqAnswer = {
  marginTop: "0.5rem"
};

export default AboutUs;
