import React from 'react';
import '../../App.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function WomenModule() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#FFF0F5", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#4A148C" }}>Women's Module</h2>
      <p style={{ textAlign: "center", fontSize: "18px" }}>
        Register for resources and view opportunities that empower women.
      </p>

      <div style={{
        maxWidth: "600px",
        margin: "40px auto",
        backgroundColor: "#FFFFFF",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
      }}>
        <Slider {...settings}>
          <div>
            <img src="/images/story1.jpg" alt="Amina's Story" style={{ width: "100%", borderRadius: "10px" }} />
            <p><strong>Amina:</strong> "Thanks to the mentorship program, I secured my first internship!"</p>
          </div>
          <div>
            <img src="/images/story2.jpg" alt="Faith's Story" style={{ width: "100%", borderRadius: "10px" }} />
            <p><strong>Faith:</strong> "The scholarship opportunity changed my academic journey forever."</p>
          </div>
          <div>
            <img src="/images/Maasaiwomanandstudents.jpg" alt="Peris's Story" style={{ width: "100%", borderRadius: "10px" }} />
            <p><strong>Peris:</strong> "My leadership is driven by my desire to protect Maasai girls from harmful traditions."</p>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default WomenModule;
