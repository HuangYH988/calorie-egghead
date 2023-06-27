import React from "react";
//import { Link, Outlet } from "react-router-dom";
import Plot from "react-plotly.js";
//import { Button } from "@mui/material";

export default class WeeklyCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const { data } = this.props;
    const layout = {
      title: "Weekly calories and sodium intake",
      height: 700,
      width: 1000,
      barmode: "group",
    };
    const mondayNutrition = this.dataPlot(data[0], "monday");
    const tuesdayNutrition = this.dataPlot(data[1], "tuesday");
    const nutrition = [mondayNutrition, tuesdayNutrition];

    return(
    <div className="Analysis-plot">
      <Plot data={nutrition} layout={layout} />
    </div>);
  }
}
