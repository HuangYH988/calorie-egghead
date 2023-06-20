import React from "react";
import * as Items from "./DummyData";

export default class Analysis extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    dataProcess(data){
        let calories = 0;
        for(let i=0;i<data.length;i++){
            calories+=data[i].calories;
        };
        return calories;
    }

    render(){
        const dummyData=Items.foodItem1.items;
        const result = this.dataProcess(dummyData);
        console.log(result);
        return<div>Analyzed nutritional data</div>
    }
}