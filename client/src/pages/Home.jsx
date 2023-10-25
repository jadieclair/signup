import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { AuthContext } from "../AuthContext";
import logo from "../assest/Logo.png";
import img from "../assest/hero2.jpg";

function Home() {
  const navigate = useNavigate();

  // Destructure values from AuthContext
  const { userName, setUserName, isAuth, email } = useContext(AuthContext);

  // State variables
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  // Enable credentials in Axios for CORS
  axios.defaults.withCredentials = true;

  // Fetch user authentication status when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        if (res.data.Status === "Success") {
          // If authentication is successful, set authentication status and user name
          setAuth(true);
          setUserName(res.data.name);
        } else {
          // If authentication fails, set authentication status and error message
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  // Handle user logout
  const handleDelete = () => {
    axios
      .get("http://localhost:3000/logout")
      .then((res) => {
        console.log("Logout successful");
        alert(res.data.Message);
        // Redirect to login page after successful logout
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <>
      {isAuth ? (
        <div className="container">
          <header className="header">
            <logo className="ruix">
              <img src={logo} alt="" />
            </logo>
            <h1>Systems Security & Cybersecurity Specialists</h1>
            <div className="auth-container">
              <h3 className="welcome-message">
                Good Day, {userName}! <br />
                We are happy to see you again...
              </h3>
              <nav className="navbar">
                <a href="#" className="nav-link">
                  Home
                </a>
                <a href="#" className="nav-link">
                  Services
                </a>
                <a href="#" className="nav-link">
                  Contact
                </a>
                <Link to="#" className="logout-button" onClick={handleDelete}>
                  Logout
                </Link>
              </nav>
            </div>
          </header>

          <section className="hero">
            <img
              src={img}
              className="hero-img"
              alt="Top-secret stamp on black background"
            />

            <div className="hero-content">
              <h2>
                <b>Your Trusted Partner for Security Solutions</b>
              </h2>
              <h3>Welcome to Systems Security & Cybersecurity Specialists:</h3>
              <br />
              <p>
                At Systems Security & Cybersecurity Specialists, we redefine the
                very essence of digital security. In an era where every
                keystroke matters and every piece of information holds
                tremendous value, we stand as the guardians of your digital
                realm. As pioneers in the field of Systems Security and
                Cybersecurity, we craft innovative solutions that empower
                individuals and businesses to navigate the digital landscape
                with confidence. <br />
              </p>
              <h3>Our Expertise</h3>
              <i>Guardians of Your Digital Fort:</i>
              <br />
              <br />
              We are the architects of impenetrable digital fortresses. Our team
              of seasoned experts employs cutting-edge technologies to shield
              your systems from evolving cyber threats. Whether you're a small
              business aiming for robust data protection or a large enterprise
              securing intricate networks, we customize solutions that fit like
              a glove.
              <br />
              <br />
              <i>Cybersecurity, Redefined:</i>
              <br />
              <br />
              In the ever-shifting battleground of cyberspace, we redefine
              cybersecurity. Our specialists anticipate threats before they
              materialize, ensuring your data remains secure and your operations
              seamless. We believe in proactive defense, where threats are
              neutralized before they even knock on your digital door.
              <br />
              <br />
              <i>Innovation as Standard:</i>
              <br />
              <br />
              Innovation is our cornerstone. We pioneer breakthroughs in
              cybersecurity, integrating artificial intelligence, machine
              learning, and advanced encryption protocols into our solutions.
              Your digital assets are not just protected; they're fortified with
              intelligence, capable of adapting to emerging threats in
              real-time.
              <br />
              <h3>Why Choose Us? </h3>
              <i>Expertise that Matters:</i>
              <br />
              <br />
              Backed by a team of top-tier cybersecurity professionals, we bring
              unparalleled expertise to every project. Our specialists undergo
              rigorous training and stay ahead of the curve, ensuring you
              receive solutions that surpass industry standards.
              <br />
              <br />
              <i>Tailored Solutions:</i>
              <br />
              <br />
              We understand that no two businesses are alike. Our solutions are
              meticulously tailored to meet your specific needs. Whether you
              require comprehensive network security, secure cloud integration,
              or threat intelligence services, our solutions are as unique as
              your fingerprint.
              <br />
              <br />
              <i>Customer-Centric Approach:</i>
              <br />
              <br />
              Your satisfaction is our top priority. We believe in transparency,
              open communication, and partnership. We work closely with you,
              understanding your concerns and goals, to provide solutions that
              not only meet but exceed your expectations.
              <br />
              <br />
              <div className="cta-buttons">
                <button className="cta-button primary">Explore Services</button>
                <button className="cta-button secondary">Contact Us</button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="login-container">
          <h3 className="error-message">{message}</h3>
          <h3 className="login-message">Please Login below</h3>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;
