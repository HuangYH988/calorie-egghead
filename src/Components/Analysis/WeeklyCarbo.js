import React from "react";
import Plot from "react-plotly.js";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { USER_CURRENT } from "../App";

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
const day = String(date.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

export default class WeeklyCarbo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
    };
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

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const messagesRef = ref(database); // Reference to the desired location in the Realtime Database

      // Attach an event listener to listen for changes in the data
      onValue(messagesRef, (snapshot) => {
        const fetchedData = snapshot.val();
        const filteredData = Object.values(fetchedData.Logs).filter(
          // Retrieve items that are realted to the logged in user and is from today
          (item) =>
            item.authorEmail === USER_CURRENT.email &&
            item.date === formattedDate
        );

        let filteredData2 = [];
        for (let i = 0; i < filteredData.length; i++) {
          if (filteredData[i].data) {
            filteredData2.push(filteredData[i]);
          }
        }
        this.setState({ datas: filteredData2 });
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
    const data = [this.convertData(), this.convertData()];
    const layout = {
      title: "Weekly Nutrition Intake",
      height: 700,
      width: 1000,
      barmode: "group",
      paper_bgcolor: "#f5fbfd",
      plot_bgcolor: "#e1f4fa",
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
        <Plot data={nutrition} layout={layout} />
      </div>
    );
  }
}
