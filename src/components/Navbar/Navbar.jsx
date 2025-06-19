import React from 'react'
import "./Navbar.scss"
import logo from "../../assets/logo1.png"
function Navbar() {
  return (
    <div className="navbar" data-scroll-section> 
        <div>Menu</div>
        <div>Echoes And Elegance</div>
        <div><img src={logo} alt="" /></div>
    </div>
  )
}

export default Navbar