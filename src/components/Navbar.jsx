import React from "react";
import { Avatar } from "antd";
import "./styles/navbar.css";
import { IoBookOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { isAuthenticated } from "../utils/auth";
import { enableLogin } from "../utils/store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav id="navbar">
      {/* Right side logo and title */}
      <div className="left_nav_side">
        <IoBookOutline
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Book Store
        </h3>
      </div>
      {/* Left side menu and profile */}
      <div className="right_nav_side">
        {isAuthenticated() ? (
          <>
            {" "}
            {/* Navbar menu */}
            <span className="nav_menu" onClick={() => navigate("/favourite")}>
              Favourite
            </span>
            {/* Profile */}
            <Avatar icon={<FaUser />}>Hello</Avatar>
          </>
        ) : (
          <>
            <label
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(enableLogin(true))}
            >
              Sign UP
            </label>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
