import React from "react";
import * as Items from "./Data/DummyData";
import Plot from 'react-plotly.js';

export default class Analysis extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    // dataProcess(data){
    //     let calories = 0;
    //     for(let i=0;i<data.length;i++){
    //         calories+=data[i].calories;
    //     };
    //     return calories;
    // }
    dataPlot(data,day){
        let cal=0;
        let carbo=0;
        let satFat=0;
        let chol=0;
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
        for(let i=0;i<data.length;i++){
                     cal+=data[i].calories;
                     carbo+=data[i].carbohydrates_total_g;
                     satFat+=data[i].fat_saturated_g;
                     chol+=data[i].cholesterol_mg;
                 };
        const nut = {
            x: [
              "calories",
              "carbohydrate",
              "saturated fat",
              "cholesterol"
              
            ],
      
            y: [   cal,carbo,satFat,chol],
            name:"Intake on "+day,
            orientation: "v",
            text: [
              "",
              "unit: g",
              "unit: g",
              "unit: mg"
              
            ].map(String),
      
            textposition: 'auto',
            marker: {
              color,
      
              width: 1,
            },
      
            type: "bar",
          };
          
          
       
        return nut
    }
    render(){
        const dummyData=Items.foodItem1.items;
        const dummyData2=Items.foodItem2.items;
        const layout = {

            title: 'Daily nutrition intake',
          
            barmode: 'group'
          
          };
        const mondayNutrition = this.dataPlot(dummyData,"monday");
        const tuesdayNutrition = this.dataPlot(dummyData2,"tuesday");
        const nutrition=[mondayNutrition,tuesdayNutrition]
        //console.log(nutrition);
        return<div>Analyzed nutritional data:
            
            <Plot data={nutrition} layout={layout} />
        </div>
    }
}