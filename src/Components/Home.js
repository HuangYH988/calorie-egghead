import React from "react";
import logo from "../Images/logo.png";
import "./Home.css";
import { Link } from "react-router-dom";
import { BiHappy } from "react-icons/bi";

export default function Home({ logInUser }) {
  return (
    <div className="Home-div">
      <img src={logo} className="Home-logo" alt="logo" />
      <h3 className="Home-logo-title">Calorie Egghead</h3>
      {logInUser ? (
        <div className="Home-div">
          <span className="Home-logo-title-desc2">
            Welcome, {logInUser.displayName}&nbsp;&nbsp;
            <BiHappy />
          </span>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="Home-buttons-container">
            <Link to="/logmeal" style={{ textDecoration: "none" }}>
              <button className="Home-buttons"> LOG MEAL</button>
            </Link>
            <Link to="/history" style={{ textDecoration: "none" }}>
              <button className="Home-buttons"> HISTORY &nbsp; </button>
            </Link>
            <Link to="/analysis" style={{ textDecoration: "none" }}>
              <button className="Home-buttons"> ANALYSIS </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="Home-div">
          <span className="Home-logo-title-desc">
            Track, Count and Analyze your calories.
          </span>
          <button className="login-button">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Create Account Or Log In
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
