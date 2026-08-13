import React from 'react';
import "./Nav.scss";
import DateTime from './DateTime';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="left">
      <div className="apple-icon">
        <img src="/Nav-baricons/apple.svg" alt="Apple" />
      </div>
          <div className="nav-items">
            <p>Aditya Thakur</p>
          </div>
           <div className="nav-items">
            <p>File</p>
          </div>
           <div className="nav-items">
            <p>Window</p>
          </div>
           <div className="nav-items">
            <p>terminal</p>
          </div>
      </div>

      <div className="right">
         <div className="nav-icon">
          <img src="/Nav-baricons/wifi.svg" alt="WiFi" />
         </div>
         <div className="nav-icon">
          <DateTime />
         </div>
      </div>
    </nav>
  );
};

export default Nav;