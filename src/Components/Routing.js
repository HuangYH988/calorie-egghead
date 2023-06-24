import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import FAQ from "./FAQ";
import ErrorPage from "./ErrorPage";
import UserAuth from "./UserAuth";
import Analysis from "./Analysis/Analysis";
import UploadForm from "./UploadForm";
import AnalysisDay from "./Analysis/AnalysisDay";
import AnalysisWeek from "./Analysis/AnalysisWeek";
import * as Items from "./Data/DummyData";
import React from "react";

export default class Routing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const dummyData = Items.foodItem1.items;
    const dummyData2 = Items.foodItem2.items;
    const weekData = [dummyData, dummyData2];
    const { state } = this.props;
    return (
      <Routes>
        <Route path="/" element={<Home logInUser={state} />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/analysis" element={<Analysis />}>
          <Route path="daily" element={<AnalysisDay data={dummyData} />} />
          <Route path="weekly" element={<AnalysisWeek data={weekData} />} />
        </Route>
        <Route path="/login" element={<UserAuth />} />
        <Route path="/logmeal" element={<UploadForm logInUser={state} />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    );
  }
}
