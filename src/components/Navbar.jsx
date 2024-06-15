import React from "react";
import { Avatar } from "antd";
import "./styles/navbar.css";
import { IoBookOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav id="navbar">
      {/* Right side logo and title */}
      <div className="left_nav_side">
        <IoBookOutline className="logo" />
        <h3>Book Store</h3>
      </div>
      {/* Left side menu and profile */}
      <div className="right_nav_side">
            {/* Navbar menu */}
        <span className="nav_menu">Favourite</span>
        {/* Profile */}
        <Avatar icon={<FaUser/>}>Hello</Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
