import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import FAQ from "./FAQ";
import ErrorPage from "./ErrorPage";
import UserAuth from "./UserAuth";
import LogMeal from "./LogMeal";
import Hist from "./Hist";
import Analysis from "./Analysis/Analysis";
import AnalysisDay from "./Analysis/AnalysisDay";
import AnalysisWeek from "./Analysis/AnalysisWeek";
import * as Items from "./Data/DummyData";
import WeeklyCal from "./Analysis/WeeklyCal";
import WeeklyCarbo from "./Analysis/WeeklyCarbo";

export default function Routing({ loggedInUser }) {
  const dummyData = Items.foodItem1.items;
  const dummyData2 = Items.foodItem2.items;
  const weekData = [dummyData, dummyData2];
  return (
    <Routes>
      <Route path="/" element={<Home logInUser={loggedInUser} />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/analysis" element={<Analysis />}>
        <Route path="daily" element={<AnalysisDay data={dummyData} />} />
        <Route path="weekly" element={<AnalysisWeek data={weekData} />}>
          <Route path="cal+sodium" element={<WeeklyCal data={weekData} />} />
          <Route
            path="carbo+others"
            element={<WeeklyCarbo data={weekData} />}
          />
        </Route>
      </Route>
      <Route path="/login" element={<UserAuth />} />
      <Route path="/logmeal" element={<LogMeal logInUser={loggedInUser} />} />
      <Route path="/history" element={<Hist logInUser={loggedInUser} />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}
