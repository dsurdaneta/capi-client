import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header-content">
        <img 
          src="/capi-header-logo.png" 
          alt="cAPI Logo" 
          className="app-header-logo"
        />
        <div className="app-header-text">
          <h1>cAPI Client</h1>
          <p>Test and interact with REST APIs</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
