import React from "react";
import logo from "../Images/logo.png";
import "./Home.css";

export default function Home() {
  return (
    <div className="Home-div">
      <img src={logo} className="Home-logo" alt="logo" />
      <h3 className="Home-logo-title">Calorie Egghead</h3>
      <span className="Home-logo-title-desc">
        Track, Count and Analyze your calories.
      </span>
      <button className="login-button">Create Account Or Log In</button>
    </div>
  );
}
