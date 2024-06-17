import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import "./styles/navbar.css";
import { IoBookOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { isAuthenticated } from "../utils/auth";
import { enableLogin, setloggedin } from "../utils/store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isloggedin } = useSelector((state) => state.bookstore);
 const [toggle,setToggle]=useState(false)
  const logout = () => {
    dispatch(setloggedin(false));
    sessionStorage.removeItem("token");
  };

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

      <div className="mobile_menu" >
        <MdMenu className="menu" onClick={()=>setToggle(prev=>!prev)}/>
      </div>
      {toggle && <div className="mobile_nav">
      {isAuthenticated() || isloggedin ? (
          <div className="after_login">
            {" "}
            {/* Navbar menu */}
            <span className="nav_menu" onClick={() => navigate("/favourite")}>
              Favourite
            </span>
            {/* Profile */}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 0,
                    label: <label onClick={() => logout()}>Log Out</label>,
                  },
                ],
              }}
              placement="topRight"
            >
              <Avatar style={{ cursor: "pointer" }} icon={<FaUser />}>
                Name
              </Avatar>
            </Dropdown>
          </div>
        ) : (
          <>
          {/* Signup option */}
            <label
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(enableLogin(true))}
            >
              Sign UP
            </label>
          </>
        )}
      </div>}
     

      {/* Left side menu and profile */}
      <div className="right_nav_side">
        {isAuthenticated() || isloggedin ? (
          <>
            {" "}
            {/* Navbar menu */}
            <span className="nav_menu" onClick={() => navigate("/favourite")}>
              Favourite
            </span>
            {/* Profile */}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 0,
                    label: <label onClick={() => logout()}>Log Out</label>,
                  },
                ],
              }}
              placement="topRight"
            >
              <Avatar style={{ cursor: "pointer" }} icon={<FaUser />}>
                Name
              </Avatar>
            </Dropdown>
          </>
        ) : (
          <>
          {/* Signup option */}
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
