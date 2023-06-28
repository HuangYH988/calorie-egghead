import React from "react";

import Plot from "react-plotly.js";


export default class WeeklyCarbo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  dataPlot(data, day) {
    
    let carbo = 0;
    let satFat = 0;
    let chol = 0;

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
     
      carbo += data[i].carbohydrates_total_g;
      satFat += data[i].fat_saturated_g;
      chol += data[i].cholesterol_mg;
    }
    const nut = {
      x: ["carbohydrate", "saturated fat", "cholesterol"],
      y: [carbo, satFat, chol],
      name: "Intake on " + day,
      orientation: "v",
      text: ["unit: g", "unit: g", "unit: mg"].map(String),
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
      title: "Weekly nutrition intake",
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
      <div className="Analysis-plot">
        <Plot data={nutrition} layout={layout} />
      </div>
    );
  }
}
