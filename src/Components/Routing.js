import React from "react";
import { Routes, Route } from "react-router-dom";
import { USER_CURRENT } from "./App";
import Home from "./Home";
import About from "./About";
import FAQ from "./FAQ";
import ErrorPage from "./ErrorPage";
import UserAuth from "./UserAuth";
import LogMeal from "./LogMeal";
import Hist from "./Hist";
import Analysis from "./Analysis/Analysis";
import AnalysisWeek from "./Analysis/AnalysisWeek";
import WeeklyCarbo from "./Analysis/WeeklyCarbo";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home logInUser={USER_CURRENT} />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/analysis" element={<Analysis />}>
        <Route path="weekly" element={<AnalysisWeek />}>
          <Route path="others" element={<WeeklyCarbo />} />
        </Route>
      </Route>
      <Route path="/login" element={<UserAuth />} />
      <Route path="/logmeal" element={<LogMeal logInUser={USER_CURRENT} />} />
      <Route path="/history" element={<Hist logInUser={USER_CURRENT} />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}
