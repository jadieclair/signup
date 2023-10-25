import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import logo from "../assest/Logo.png";
import img from "../assest/log2-img.jpg";
import { AuthContext } from "../AuthContext";

const Login = () => {
  // Accessing setIsAuth and setEmail functions from AuthContext
  const { setIsAuth, setEmail } = useContext(AuthContext);

  // State to store email and password input values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Axios configuration to send credentials (cookies) with requests
  axios.defaults.withCredentials = true;

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Sending a POST request to the login endpoint with input values
    axios
      .post("http://localhost:3000/login", values)
      .then((res) => {
        // If login is successful, update context and navigate to the home page
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          setEmail(values.email); // Set email in context
          setIsAuth(true); // Set authentication status in context
          navigate("/"); // Navigate to home page
        } else {
          // If login fails, show error message
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="login">
      <div className="log-card">
        <div className="log-left">
          <img className="log-logo" src={logo} alt="Logo" />
          <h3 className="log-header">LOG-IN</h3>
          <p className="log-account">Log-in to get started.</p>

          <div className="log-separator">
            <div className="log-solid-line"></div>
            <div className="log-or-text">Welcome Back</div>
            <div className="log-solid-line"></div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="log-form">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="log-input"
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
                className="log-input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <div className="log-checkbox">
              <input type="checkbox" id="rememberMe" />
              <label className="log-rememberme" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <button className="log-in-button">Log-In</button>
          </form>

          {/* Link to registration page */}
          <span className="log-accountnone">
            Don't have an account?{" "}
            <Link to="/register">
              <button className="log-but">Create an Account</button>
            </Link>
          </span>
        </div>
        <div className="log-right">
          <img src={img} className="log-img" alt="Image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
