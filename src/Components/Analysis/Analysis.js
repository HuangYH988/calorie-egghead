import React from "react";
import "../App.css";
import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Plot from "react-plotly.js";
import { FetchedData } from "../Data/FetchedData";

const RECOMMENDED_CALORIE = 3200;
const RECOMMENDED_CARBO = 406;
const RECOMMENDED_SATURATED = 17;
const RECOMMENDED_CHOLESTROL = 300;

export default class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: true,
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
        labels: [
          "Calories consumed: " + cal,
          "Maximum daily recommendation: 3200",
        ],
        domain: {
          x: [0, 0.48],
          y: [0.52, 1],
        },
        
        name: "Daily calories consumed",
        hole: 0.4,
        type: "pie",
        marker: {
          colors: ['orange', 'blue'],
        },
      },
      {
        values: [percentageCarbo, 100 - percentageCarbo],
        labels: [
          "Carbohydrate consumed: " + carbo,
          "Maximum daily recommendation: 406g",
        ],
        domain: {
          x: [0.52, 1],
          y: [0.52, 1],
        },
        
        name: "Daily carbohydrate consumed",
        hole: 0.4,
        type: "pie",
        marker: {
          colors: ['purple', 'blue'],
        },
      },
      {
        values: [percentageSatFat, 100 - percentageSatFat],
        labels: [
          "Saturated fat consumed: " + satFat,
          "Maximum daily recommendation: 17g",
        ],
        domain: {
          x: [0, 0.48],
          y: [0, 0.48],
        },
       
        name: "Daily saturated fat consumed",
        hole: 0.4,
        type: "pie",
        marker: {
          colors: ['darkred', 'blue'],
        },
      },
      {
        values: [percentageChol, 100 - percentageChol],
        labels: [
          "Cholestrol consumed: " + chol,
          "Maximum daily recommendation: 300mg",
        ],
        domain: {
          x: [0.52, 1],
          y: [0, 0.48],
        },
       
        name: "Daily cholestrol consumed",
        hole: 0.4,
        type: "pie",
        marker: {
          colors: ['lightgreen', 'blue'],
        },
      },
    ];

    return pieChartData;
  }
  shouldRender() {
    const { pathname } = window.location;
    return pathname === "/analysis";
  }
  render() {
    const { daily, weekly } = this.state;
    const shouldRender = this.shouldRender();
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
          x: 0.19,
          y: 0.79,
        },

        {
          font: {
            size: 18,
          },
          showarrow: false,
          text: `Carbo-`,
          width: 80,
          x: 0.81,
          y: 0.8,
        },
        {
          font: {
            size: 18,
          },
          showarrow: false,
          text: `hydrates`,
          width: 80,
          x: 0.81,
          y: 0.77,
        },
        {
          font: {
            size: 19,
          },
          showarrow: false,
          text: "Saturated",
          x: 0.19,
          y: 0.23,
        },
        {
          font: {
            size: 19,
          },
          showarrow: false,
          text: "Fat",
          x: 0.22,
          y: 0.19,
        },
        {
          font: {
            size: 18,
          },
          showarrow: false,
          text: "Cholestrol",
          x: 0.81,
          y: 0.21,
        },
      ],
      height: 700,
      width: 1000,
      showlegend: false,
      grid: { rows: 1, columns: 2 },
    };
    return (
      <div>
        <div>
          <Outlet />
          <FetchedData />
          {shouldRender && (
            <div className="Analysis-container">
              <div className="Analysis-sidebar">
                <div>
                  <h3>Daily recommended maximum intake:</h3>
                  Calorie: {RECOMMENDED_CALORIE}cal <br />
                  Carbohydrate: {RECOMMENDED_CARBO}g <br />
                  Saturated Fat: {RECOMMENDED_SATURATED}g <br />
                  Cholestrol: {RECOMMENDED_CHOLESTROL}mg
                </div>
              </div>
              <div>
                <Plot data={chartData} layout={layout} />
              </div>
            </div>
          )}
        </div>

        <div className="Analysis-content">
          <div className="Analysis-links">
            <Button
              variant="contained"
              disabled={daily}
              onClick={() => this.onClickDaily()}
            >
              <Link to="/analysis" style={{ textDecoration: "none" }}>
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
