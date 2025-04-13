import React from 'react';

const Footer = () => {
  return (
    <footer style={{ border: '2px solid black', margin: '50px 5px 5px 5px' }}>
      <div className="f-info">
        <div className="f-info-socials">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>

        <div className="w">
          <i className="fa-regular fa-copyright"></i>&nbsp;
          <b style={{ fontSize: 'larger' }}>2025 Kiara PVT. LIMITED.</b>
        </div>

        <div className="f-info-links">
          <a href="/privacy">Privacy</a>&nbsp;&nbsp;
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
