import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import Plot from "react-plotly.js";

export default class AnalysisWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: true,
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
  dataPlot(data, day) {
    let cal = 0;
    let sodium = 0;

    const colorMap = {
      monday: "rgba(255,0,50,0.6)",
      tuesday: "rgba(255,150,0,0.6)",
      wednesday: "rgba(255,255,50,0.6)",
      thursday: "rgba(0,255,50,0.6)",
      friday: "rgba(50,50,255,0.6)",
      saturday: "rgba(200,0,255,0.6)",
      sunday: "rgba(150,50,200,0.6)",
    };

    let color = colorMap[day] || "rgba(55,128,191,0.6)";
    for (let i = 0; i < data.length; i++) {
      cal += data[i].calories;
      sodium += data[i].sodium_mg;
    }
    const nut = {
      x: ["calories", "sodium"],
      y: [cal, sodium],
      name: "Intake on " + day,
      orientation: "v",
      text: ["", "unit: mg"].map(String),
      textposition: "auto",
      marker: {
        color,
        width: 1,
      },
      type: "bar",
    };

    return nut;
  }
  shouldRender() {
    const { pathname } = window.location;
    return pathname === "/analysis/weekly";
  }
  render() {
    const { cal, carbo } = this.state;
    const shouldRender = this.shouldRender();
    const { data } = this.props;
    const layout = {
      title: "Weekly calories and sodium intake",
      height: 700,
      width: 1000,
      barmode: "group",
    };
    const mondayNutrition = this.dataPlot(data[0], "monday");
    const tuesdayNutrition = this.dataPlot(data[1], "tuesday");
    const wednesdayNutrition = this.dataPlot(data[0], "wednesday");
    const thursdayNutrition = this.dataPlot(data[1], "thursday");
    const fridayNutrition = this.dataPlot(data[1], "friday");
    const saturdayNutrition = this.dataPlot(data[1], "saturday");
    const sundayNutrition = this.dataPlot(data[0], "sunday");
    const nutrition = [
      mondayNutrition,
      tuesdayNutrition,
      wednesdayNutrition,
      thursdayNutrition,
      fridayNutrition,
      saturdayNutrition,
      sundayNutrition,
    ];
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
              <Link to="/analysis/weekly" style={{ textDecoration: "none" }}>
                Calories+Sodium intake
              </Link>
            </Button>
            <Button
              variant="contained"
              disabled={carbo}
              onClick={() => this.onClickCarbo()}
            >
              <Link
                to="/analysis/weekly/others"
                style={{ textDecoration: "none" }}
              >
                Carbo, Fat and Cholesterol
              </Link>
            </Button>
          </div>
          <Outlet />
          {shouldRender && (
            <div className="Analysis-plot">
              <Plot data={nutrition} layout={layout} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
