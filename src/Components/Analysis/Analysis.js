import React from "react";
import logo from "../../Images/logo.png";
import "../App.css";
import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: false,
      weekly: false,
    };
  }
  onClickDaily() {
    const { daily } = this.state;
    if (!daily) {
      this.setState({ daily: true, weekly: false });
    }
  }
  onClickWeekly() {
    const { weekly } = this.state;
    if (!weekly) {
      this.setState({ daily: false, weekly: true });
    }
  }
  render() {
    const { daily, weekly } = this.state;
    //console.log(nutrition);
    return (
      <div>
        <div>
        <Outlet />
        {!daily && !weekly && (
          <div>
            <img src={logo} className="Home-logo" alt="logo" />
            <h3 className="Home-logo-title">Calorie Egghead</h3>
            <br /><br />
            <p>
              Click on buttons below to see your daily or weekly nutritional
              analysis
            </p>
          </div>
        )}</div>

<div className="Analysis-content">
        <div className="Analysis-links">
          <Button
            variant="contained"
            disabled={daily}
            onClick={() => this.onClickDaily()}
          >
            <Link to="/analysis/daily" style={{ textDecoration: "none" }}>
              Daily
            </Link>
          </Button>
          <Button
            variant="contained"
            disabled={weekly}
            onClick={() => this.onClickWeekly()}
          >
            <Link to="/analysis/weekly" style={{ textDecoration: "none" }}>
              Weekly
            </Link>
          </Button>
        </div>
        <div className="Analysis-main">
          {/* Your main content goes here */}
        </div>
      </div>
      </div>
    );
  }
}
