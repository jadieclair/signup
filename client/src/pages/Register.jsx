import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./register.css";
import img from "../assest/img2.jpg";
import logo from "../assest/Logo.png";
import { AuthContext } from "../AuthContext";

const Register = () => {
  // Accessing context functions
  const { setUserName, setEmail, setIsAuth } = useContext(AuthContext);

  // State to store user input values
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      return alert("Invalid email format");
    }

    // Validate password criteria (minimum length)
    const minPasswordLength = 8;
    if (values.password.length < minPasswordLength) {
      return alert(
        `Password must be at least ${minPasswordLength} characters long`
      );
    }

    // If input is valid, send the registration request
    axios
      .post("http://localhost:3000/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setEmail(values.email);
          setIsAuth(true);
          navigate("/login");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  const clientId =
    "106587600204-ie4vt0ur17ff0oqcr5qp9438n7bsf5ta.apps.googleusercontent.com";

  // Function to handle Google login success
  const handleLoginSuccess = (credentialResponse) => {
    // Decoding JWT token from Google credential response
    const credentialResponseDecoded = jwt_decode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
    // Setting user email, name, and authentication status in context
    setEmail(credentialResponseDecoded.email);
    setUserName(credentialResponseDecoded.given_name);
    setIsAuth(true);

    alert("Google Sign-in successful!");

    navigate("/"); // Navigating to the home page after successful login
  };

  // Function to handle Google login error
  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="register">
      <div className="reg-card">
        <div className="reg-left">
          <img className="reg-logo" src={logo} alt="Logo" />
          <h3 className="reg-header">SIGN UP</h3>
          <p className="reg-account">Create an account to get started.</p>
          <br />
          <br />
          {/* Google Login button */}
          <div id="signInButton">
            <GoogleLogin
              clientId={clientId}
              buttonText="Login Continue With Google"
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
          <div className="separator">
            <div className="solid-line"></div>
            <div className="or-text">Or</div>
            <div className="solid-line"></div>
          </div>
          {/* Registration form */}
          <form onSubmit={handleSubmit} className="reg-form">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                className="reg-input"
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="reg-input"
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                className="reg-input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <div className="reg-checkbox">
              <input type="checkbox" id="rememberMe" />
              <label className="reg-rememberme" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <button className="reg-button">Register</button>
          </form>
          {/* Link to login page */}
          <span className="reg-accountnone">
            Already have an account?{" "}
            <Link to="/login" className="reg-loginbtn">
              Login
            </Link>
          </span>
        </div>
        <div className="reg-right">
          <img src={img} className="reg-img" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
