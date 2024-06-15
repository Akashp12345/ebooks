import React from "react";
import { Avatar } from "antd";
import "./styles/navbar.css";
import { IoBookOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { isAuthenticated } from "../utils/auth";
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
{isAuthenticated() ?<>   {/* Navbar menu */}
        <span className="nav_menu">Favourite</span>
        {/* Profile */}
        <Avatar icon={<FaUser/>}>Hello</Avatar></>:<><button>Sign UP</button></>}
            
         
      </div>
    </nav>
  );
};

export default Navbar;
