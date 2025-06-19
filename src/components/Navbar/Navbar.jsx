import React from 'react';
import './Navbar.scss';
import logo from '../../assets/logo1.png'; // Make sure the path is correct relative to Navbar.jsx

function Navbar() {
  return (
    <div className="navbar" data-scroll-section>
      <div className="navbar-left">
        <span className="navbar-menu-text">Menu</span> {/* Added class for targeting */}
      </div>
      <div className="navbar-center">
        {/* Added logo and title together */}
        <div className="logo">
          <img src={logo} alt="Echoes And Elegance Logo" />
        </div>
        <div className="navbar-title-text">Echoes And Elegance</div> {/* Added class for targeting */}
      </div>
      <div className="navbar-right">
        <span className="navbar-music-text">Music</span> {/* Added class for targeting */}
      </div>
    </div>
  );
}

export default Navbar;