import React from "react";
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
        <Outlet />

        <div className="Analysis-links">
          <Button
            variant="contained"
            disabled={daily}
             onClick={()=>this.onClickDaily()}
          >
            <Link to="/analysis/daily" style={{ textDecoration: "none" }}>
              Daily
            </Link>
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            disabled={weekly}
             onClick={()=>this.onClickWeekly()}
          >
            <Link to="/analysis/weekly" style={{ textDecoration: "none" }}>
              Weekly
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
