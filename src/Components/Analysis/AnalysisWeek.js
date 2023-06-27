import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../Images/logo.png";
import { Button } from "@mui/material";

export default class AnalysisWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: false,
      carbo: false,
    };
  }
  onClickCal() {
    const { cal } = this.state;
    if (!cal) {
      this.setState({ cal: true, carbo: false });
    }
  }
  onClickCarbo() {
    const { carbo } = this.state;
    if (!carbo) {
      this.setState({ cal: false, carbo: true });
    }
  }
  shouldRenderLogo() {
    const { pathname } = window.location;
    return pathname === "/analysis/weekly";
  }
  render(){
    const { cal, carbo } = this.state;
    const shouldRender = this.shouldRenderLogo();
    return (
      <div>
        <h1>Nutritional analysis by week</h1>
        <div className="Analysis-container">
          <div className="Analysis-sidebar">
            <Button
              variant="contained"
              disabled={cal}
              onClick={() => this.onClickCal()}
            >
              <Link
                to="/analysis/weekly/cal+sodium"
                style={{ textDecoration: "none" }}
              >
                Calories+Sodium intake
              </Link>
            </Button>
            <Button
              variant="contained"
              disabled={carbo}
              onClick={() => this.onClickCarbo()}
            >
              <Link
                to="/analysis/weekly/carbo+others"
                style={{ textDecoration: "none" }}
              >
                Carbo, Fat and Cholesterol
              </Link>
            </Button>
          </div>
          <Outlet />
          {!carbo && !cal && shouldRender &&(
          <div>
            <img src={logo} className="Home-logo" alt="logo" />
            <h3 className="Home-logo-title">Calorie Egghead</h3>
            <br /><br />
            <p>
              Click on buttons at the left to see your respective weekly nutritional
              analysis
            </p>
          </div>
        )}
        </div>
        
      </div>
    );
  }
}
