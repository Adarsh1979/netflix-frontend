import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";
import {API_URL} from "../../baseUrl";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();    // to avoid disapperance behaviour

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/auth/register`, {email, username, password});
      navigate("/login");
    } catch (err) {
      alert("User Already Exists, Please Login");
    }
  };

  const handleClick = () => {
    navigate("/login");
  }

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
            alt="netflix-logo"
          />
          <button className="loginbutton" onClick={handleClick}>Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV Shows and More</h1>
        <h2>Watch anywhere, cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>

        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
