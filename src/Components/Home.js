import React from "react";
import logo from "../Images/logo.png";
import "./Home.css";
import { Routes, Link, Route } from "react-router-dom";
import UserAuth from "./UserAuth";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { logInUser } = this.props;
    return (
      <div className="Home-div">
        <img src={logo} className="Home-logo" alt="logo" />
        <h3 className="Home-logo-title">Calorie Egghead</h3>
        <span className="Home-logo-title-desc">
          Track, Count and Analyze your calories.
          
        </span>
        <div>
        {logInUser ? (
          
            <h2 className ="Home-div2">Welcome, {logInUser.displayName}</h2>
          
        ) : (
          <button className="login-button">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Create Account Or Log In
            </Link>
          </button>
        )}
        </div>
        <Routes>
          <Route path="/login" element={<UserAuth />} />
        </Routes>
      </div>
    );
  }
}
