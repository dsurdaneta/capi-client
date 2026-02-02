import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <img 
        src="/capi-footer-logo.png" 
        alt="cAPI Footer Logo" 
        className="app-footer-logo"
      />
    </footer>
  );
};

export default Footer;
