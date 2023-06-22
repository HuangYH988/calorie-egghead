import React from "react";
import Plot from "react-plotly.js";
import {Link} from "react-router-dom";

const RECOMMENDED_CALORIE = 3200;
const RECOMMENDED_CARBO = 406;
const RECOMMENDED_SATURATED = 17;
const RECOMMENDED_CHOLESTROL = 300;

export default class AnalysisDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  dataPlot(data) {
    let cal = 0;
    let carbo = 0;
    let satFat = 0;
    let chol = 0;
    let percentageCal = 0;
    let percentageCarbo = 0;
    let percentageSatFat = 0;
    let percentageChol = 0;
    for (let i = 0; i < data.length; i++) {
      cal += data[i].calories;
      carbo += data[i].carbohydrates_total_g;
      satFat += data[i].fat_saturated_g;
      chol += data[i].cholesterol_mg;
    }

    if (cal >= RECOMMENDED_CALORIE) {
      percentageCal = 100;
    } else {
      percentageCal = (cal / RECOMMENDED_CALORIE) * 100;
    }
    if (carbo >= RECOMMENDED_CARBO) {
      percentageCarbo = 100;
    } else {
      percentageCarbo = (carbo / RECOMMENDED_CARBO) * 100;
    }
    if (satFat >= RECOMMENDED_SATURATED) {
      percentageSatFat = 100;
    } else {
      percentageSatFat = (satFat / RECOMMENDED_SATURATED) * 100;
    }
    if (chol >= RECOMMENDED_CHOLESTROL) {
      percentageChol = 100;
    } else {
      percentageChol = (chol / RECOMMENDED_CHOLESTROL) * 100;
    }
    const pieChartData = [
      {
        values: [percentageCal, 100 - percentageCal],
        labels: ["Calories consumed", "Maximum daily recommendation"],
        domain: {
          x: [0, 0.48],

          y: [0.52, 1],
        },
        hoverinfo: ["test1", "test2"],
        name: "Daily calories consumed",
        hole: 0.4,
        type: "pie",
      },
      {
        values: [percentageCarbo, 100 - percentageCarbo],
        labels: ["Carbohydrate consumed", "Maximum daily recommendation"],
        domain: {
          x: [0.52, 1],

          y: [0.52, 1],
        },
        hoverinfo: ["test1", "test2"],
        name: "Daily carbohydrate consumed",
        hole: 0.4,
        type: "pie",
      },
      {
        values: [percentageSatFat, 100 - percentageSatFat],
        labels: ["Saturated fat consumed", "Maximum daily recommendation"],
        domain: {
          x: [0, 0.48],

          y: [0, 0.48],
        },
        hoverinfo: ["test1", "test2"],
        name: "Daily saturated fat consumed",
        hole: 0.4,
        type: "pie",
      },
      {
        values: [percentageChol, 100 - percentageChol],
        labels: ["Cholestrol consumed", "Maximum daily recommendation"],
        domain: {
          x: [0.52, 1],

          y: [0, 0.48],
        },
        hoverinfo: ["test1", "test2"],
        name: "Daily cholestrol consumed",
        hole: 0.4,
        type: "pie",
      },
    ];
    //console.log(percentageCal);
    return pieChartData;
  }
  render() {
    const { data } = this.props;
    const chartData = this.dataPlot(data);
    const layout = {
      title: "Percentage of daily nutritions consumed",

      annotations: [
        {
          font: {
            size: 20,
          },

          showarrow: false,

          text: "Calories",

          x: 0.2,

          y: 0.78,
        },

        {
          font: {
            size: 15,
          },

          showarrow: false,

          text: "Carbohydrates",

          x: 0.81,

          y: 0.78,
        },
        {
          font: {
            size: 18,
          },

          showarrow: false,

          text: "Saturated Fat",

          x: 0.18,

          y: 0.21,
        },
        {
          font: {
            size: 18,
          },

          showarrow: false,

          text: "Cholestrol",

          x: 0.8,

          y: 0.21,
        },
      ],

      height: 800,

      width: 1200,

      showlegend: false,

      grid: { rows: 1, columns: 2 },
    };
    return (
      <div>
        <h1>Daily nutritional analysis</h1>
        <Plot data={chartData} layout={layout} />
        <br />
        <Link to="/analysis/daily" style={{ textDecoration: "none" }}>
            Daily
          </Link>
          <Link to="/analysis/weekly" style={{ textDecoration: "none" }}>
            Weekly
          </Link>
      </div>
    );
  }
}
