import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Modal, message } from "antd";
import { enableLogin, setloggedin } from "../utils/store/reducer";
import "./styles/registration.css";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { postrequest } from "../services/requesthandler";
const Registration = () => {
  const { login } = useSelector((state) => state.bookstore);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false); //show or hide password
  const [show1, setShow1] = useState(false); //show or hide confirm password
  const [signup, setSignup] = useState(true); //Toggle for signin and signup

  //   Registration
  const Signup = async (event) => {
    try {
      event.preventDefault();

      const { target } = event;
      const [fullname, email, password, cnfpass] = [
        target[0].value,
        target[1].value,
        target[2].value,
        target[3].value,
      ];

      const warnings = {
        fullname: "Please enter full name.",
        email: "Please enter email.",
        password: "Please enter password.",
        cnfpass: "Confirm password is not same as password.",
        passwordPattern:
          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
      };

      // Password pattern validation
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      // Checking the data
      if (
        !fullname ||
        !email ||
        !password ||
        password !== cnfpass ||
        !passwordPattern.test(password)
      ) {
        const warningMessage = !fullname
          ? warnings.fullname
          : !email
          ? warnings.email
          : !password
          ? warnings.password
          : !passwordPattern.test(password)
          ? warnings.passwordPattern
          : warnings.cnfpass;

        message.warning({ content: warningMessage });
        return;
      }

      let obj = {
        name: fullname,
        email,
        password,
      };

      // request for registration
      let response = await postrequest("/api/v1/user/register", obj);

      const token = response.headers
        .get("Authorization")
        .replace("Bearer ", "");
      sessionStorage.setItem("token", token);

      message.success({
        content: response?.data?.message,
      });
      // Changing login status
      dispatch(enableLogin(false));
      dispatch(setloggedin(true));
    } catch (err) {
      message.warning({
        content: err?.response?.data?.error,
      });
    }
  };

  //   Sign In
  const SignIn = async (event) => {
    try {
      event.preventDefault();

      const { target } = event;
      const [email, password] = [target[0].value, target[1].value];

      const warnings = {
        email: "Please enter email.",
        password: "Please enter password.",
      };

      // Checking the data
      if (!email || !password) {
        const warningMessage = !email ? warnings.email : warnings.password;

        message.warning({ content: warningMessage });
        return;
      }
      let obj = {
        email,
        password,
      };
      let response = await postrequest("/api/v1/user/signin", obj);
      const token = response.headers
        .get("Authorization")
        .replace("Bearer ", "");
      sessionStorage.setItem("token", token);

      message.success({
        content: response?.data?.message,
      });
      // setting login status
      dispatch(setloggedin(true));
      dispatch(enableLogin(false));
    } catch (err) {
      message.warning({
        content: err?.response?.data?.error,
      });
    }
  };

  return (
    <Modal
      open={login}
      onClose={() => dispatch(enableLogin(false))}
      onCancel={() => dispatch(enableLogin(false))}
      closable={false}
      footer={null}
      centered
    >
      <form className="form" onSubmit={signup ? Signup : SignIn}>
        {signup && (
          <>
            {" "}
            {/* Full Name */}
            <div className="flex-column">
              <label>Full Name </label>
            </div>
            <div className="inputForm">
              <FaRegUser style={{ fontSize: "20px" }} />
              <input
                type="text"
                className="input"
                placeholder="Enter your FullName"
              />
            </div>
          </>
        )}
        {/* Email */}
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <MdAlternateEmail style={{ fontSize: "20px" }} />
          <input type="text" className="input" placeholder="Enter your Email" />
        </div>

        {/* Password */}
        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <MdLockOutline style={{ fontSize: "20px" }} />
          <input
            type={show ? "text" : "password"}
            className="input"
            placeholder="Enter your Password"
          />
          <span style={{ cursor: "pointer" }}>
            {!show ? (
              <FaEye onClick={() => setShow(true)} />
            ) : (
              <FaEyeSlash onClick={() => setShow(false)} />
            )}
          </span>
        </div>
        {/* Confirm Password */}
        {signup && (
          <>
            {" "}
            <div className="flex-column">
              <label>Confirm Password </label>
            </div>
            <div className="inputForm">
              <MdLockOutline style={{ fontSize: "20px" }} />
              <input
                type={show1 ? "text" : "password"}
                className="input"
                placeholder="Enter your Password"
              />
              <span style={{ cursor: "pointer" }}>
                {!show1 ? (
                  <FaEye onClick={() => setShow1(true)} />
                ) : (
                  <FaEyeSlash onClick={() => setShow1(false)} />
                )}
              </span>
            </div>
          </>
        )}

        {/* Submit button */}
        <button className="button-submit">
          {signup ? "Sign Up" : "Sign In"}
        </button>

        {signup ? (
          <p className="p">
            Already have an account?{" "}
            <span className="span" onClick={() => setSignup(false)}>
              Sign In
            </span>
          </p>
        ) : (
          <p className="p">
            Don't have an account?{" "}
            <span className="span" onClick={() => setSignup(true)}>
              Sign Up
            </span>
          </p>
        )}
      </form>
    </Modal>
  );
};

export default Registration;
