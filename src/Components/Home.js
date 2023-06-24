import React from "react";
import logo from "../Images/logo.png";
import "./Home.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
            <div>
              <h2 className="Home-div2">Welcome, {logInUser.displayName}</h2>
              <Button variant="contained" className="Home-links">
                <Link to="/logmeal" style={{ textDecoration: "none" }}>
                  Log Meal
                </Link>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" className="Home-links">
                <Link to="/analysis" style={{ textDecoration: "none" }}>
                  Analysis
                </Link>
              </Button>
            </div>
          ) : (
            <button className="login-button">
              <Link to="/login" style={{ textDecoration: "none" }}>
                Create Account Or Log In
              </Link>
            </button>
          )}
        </div>
      </div>
    );
  }
}
