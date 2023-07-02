import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import Plot from "react-plotly.js";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { USER_CURRENT } from "../App";

const date = new Date();
const YEAR = date.getFullYear();
const MONTH = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
const DAY = String(date.getDate()).padStart(2, "0");
const dayOfWeekNumber = date.getDay();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeek = daysOfWeek[dayOfWeekNumber];

export default class AnalysisWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cal: true,
      carbo: false,
      datas: [[],[],[],[],[],[],[]],
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

  componentDidMount() {
    const dates = ['2023-07-01', '2023-07-02', '2023-07-03']; // Example array of date values
    let year = YEAR;
      let month = MONTH;
      let day =DAY;
    for(let i=0; i<=dayOfWeekNumber;i++){
      
      if (dayOfWeekNumber>=DAY){
        let j = dayOfWeekNumber -DAY;
        if (MONTH ===2 ||MONTH ===4||MONTH ===6||MONTH ===8||MONTH ===9||MONTH ===11||MONTH ===1){
          day = 31 - j+i;
        }else if (MONTH ===5||MONTH ===7||MONTH ===10||MONTH ===12){
          day = 30 - j+i;
        }else {
          if(YEAR%4===0 && YEAR!==2100){
            day = 29 - j+i;
          } else {
            day = 28 - j+i;
          }
        }
        if (MONTH ===1){
          year = YEAR -1;
          month = 12;
        } else{
          month = MONTH-1;
        }
      } else {
        day = DAY -i;
    }   
    let formattedDate = `${year}-${month}-${day}`;
      this.fetchData(formattedDate,i);
  }
  }
  fetchData = async (date,i) => {
    try {
      const messagesRef = ref(database); // Reference to the desired location in the Realtime Database

      // Attach an event listener to listen for changes in the data
      onValue(messagesRef, (snapshot) => {
        const fetchedData = snapshot.val();
        const filteredData = Object.values(fetchedData.Logs).filter(
          // Retrieve items that are realted to the logged in user and is from today
          (item) =>
            item.authorEmail === USER_CURRENT.email &&
            item.date === date
        );

        let filteredData2 = [];
        for (let i = 0; i < filteredData.length; i++) {
          if (filteredData[i].data) {
            filteredData2.push(filteredData[i]);
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
  convertData() {
    const data = this.state.datas;
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
    const data = [this.convertData(), this.convertData()];
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
