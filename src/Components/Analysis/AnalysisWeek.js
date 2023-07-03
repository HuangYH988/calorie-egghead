import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import Plot from "react-plotly.js";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { USER_CURRENT } from "../App";

const date = new Date();
const YEAR = date.getFullYear();
const Month = date.getMonth() + 1; // Months are zero-indexed, so add 1
const Day = date.getDate();
const dayOfWeekNumber = date.getDay();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default class AnalysisWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: true,
      carbo: false,
      datas: [[], [], [], [], [], [], []],
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
      Sunday: "rgba(255,0,50,0.6)",
      Monday: "rgba(255,150,0,0.6)",
      Tuesday: "rgba(255,255,50,0.6)",
      Wednesday: "rgba(0,255,50,0.6)",
      Thursday: "rgba(50,50,255,0.6)",
      Friday: "rgba(200,0,255,0.6)",
      Saturday: "rgba(150,50,200,0.6)",
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

  componentDidMount() {
    let year = YEAR;
    let month = Month;
    let day = Day;
    for (let i = 0; i <= dayOfWeekNumber; i++) {
      if (dayOfWeekNumber - i >= Day) {
        let j = dayOfWeekNumber - i - Day;
        if (
          Month === 2 ||
          Month === 4 ||
          Month === 6 ||
          Month === 8 ||
          Month === 9 ||
          Month === 11 ||
          Month === 1
        ) {
          day = 31 - j;
        } else if (Month === 5 || Month === 7 || Month === 10 || Month === 12) {
          day = 30 - j;
        } else {
          if (YEAR % 4 === 0 && YEAR !== 2100) {
            day = 29 - j;
          } else {
            day = 28 - j;
          }
        }
        if (Month === 1) {
          year = YEAR - 1;
          month = 12;
        } else {
          month = Month - 1;
        }
      } else {
        month = Month;
        day = Day - (dayOfWeekNumber - i);
      }
      const MONTH = month.toString().padStart(2, "0");
      const DAY = day.toString().padStart(2, "0");
      let formattedDate = `${year}-${MONTH}-${DAY}`;
      this.fetchData(formattedDate, i);
    }
  }
  fetchData = async (date, i) => {
    try {
      const messagesRef = ref(database); // Reference to the desired location in the Realtime Database

      // Attach an event listener to listen for changes in the data
      onValue(messagesRef, (snapshot) => {
        const fetchedData = snapshot.val();
        const filteredData = Object.values(fetchedData.Logs).filter(
          // Retrieve items that are realted to the logged in user and is from today
          (item) =>
            item.authorEmail === USER_CURRENT.email && item.date === date
        );

        let filteredData2 = [];
        for (let j = 0; j < filteredData.length; j++) {
          if (filteredData[j].data) {
            filteredData2.push(filteredData[j]);
          }
        }
        // Create a copy of the datas array
        const updatedDatas = [...this.state.datas];

        // Modify the desired part
        updatedDatas[i] = filteredData2;

        // Update the state with the modified array
        this.setState({ datas: updatedDatas });
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Convert Firebase data into array format for graph plot
  convertData(day) {
    const data = this.state.datas[day];
    const fetchedData = data.map((item) => item.data);
    let newData = [];
    for (let i = 0; i < fetchedData.length; i++) {
      for (let j = 0; j < fetchedData[i].length; j++) {
        newData.push(fetchedData[i][j]);
      }
    }
    return newData;
  }
  render() {
    const { cal, carbo } = this.state;
    const shouldRender = this.shouldRender();
    const data = [
      this.convertData(0),
      this.convertData(1),
      this.convertData(2),
      this.convertData(3),
      this.convertData(4),
      this.convertData(5),
      this.convertData(6),
    ];
    const layout = {
      title: "Weekly Calories & Sodium Intake",
      height: 700,
      width: 1000,
      barmode: "group",
      paper_bgcolor: "#f5fbfd",
      plot_bgcolor: "#e1f4fa",
      yaxis: {
        range: [0, 5000], // Specify the desired range for the y-axis
      },
    };
    const sundayNutrition = this.dataPlot(data[0], daysOfWeek[0]);
    const mondayNutrition = this.dataPlot(data[1], daysOfWeek[1]);
    const tuesdayNutrition = this.dataPlot(data[2], daysOfWeek[2]);
    const wednesdayNutrition = this.dataPlot(data[3], daysOfWeek[3]);
    const thursdayNutrition = this.dataPlot(data[4], daysOfWeek[4]);
    const fridayNutrition = this.dataPlot(data[5], daysOfWeek[5]);
    const saturdayNutrition = this.dataPlot(data[6], daysOfWeek[6]);

    const nutrition = [
      sundayNutrition,
      mondayNutrition,
      tuesdayNutrition,
      wednesdayNutrition,
      thursdayNutrition,
      fridayNutrition,
      saturdayNutrition,
    ];
    return (
      <div>
        <div className="Analysis-container">
          <div className="Analysis-sidebar">
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button
              variant="contained"
              disabled={cal}
              onClick={() => this.onClickCal()}
            >
              <Link to="/analysis/weekly" style={{ textDecoration: "none" }}>
                Calories + Sodium intake
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
            <div>
              <Plot data={nutrition} layout={layout} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
