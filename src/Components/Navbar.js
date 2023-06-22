import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  BrowserRouter,
  Routes,
  Link,
  Route,
  
} from "react-router-dom";
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

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  //const navigate = useNavigate();
  const dummyData = Items.foodItem1.items;
  const dummyData2 = Items.foodItem2.items;
  const weekData = [dummyData, dummyData2];
  useEffect(
    () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedInUser(user);
          //navigate("/");
        } else {
          setLoggedInUser(null);
        }
      });
    } /*[navigate]*/
  );

  return (
    <BrowserRouter>
      <AppBar position="static" style={{ backgroundColor: "#e1f4fa" }}>
        <Toolbar style={{ justifyContent: "flex-start" }}>
          <Typography variant="body1" style={{ color: "#063846" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              HOME
            </Link>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Typography variant="body1" style={{ color: "#063846" }}>
            <Link to="/about" style={{ textDecoration: "none" }}>
              ABOUT
            </Link>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Typography variant="body1" style={{ color: "#063846" }}>
            <Link to="/faq" style={{ textDecoration: "none" }}>
              FAQ
            </Link>
          </Typography>
          <Typography variant="body1" style={{ color: "#063846" }}>
            <Link to="/analysis" style={{ textDecoration: "none" }}>
              Analysis
            </Link>
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          {loggedInUser ? (
            <Typography variant="body1" style={{ color: "#063846" }}>
              <Link
                to="/"
                onClick={() =>
                  signOut(auth).then(() => {
                    setLoggedInUser(null);
                  })
                }
                style={{ textDecoration: "none" }}
              >
                Log Out
              </Link>
            </Typography>
          ) : (
            <Typography variant="body1" style={{ color: "#063846" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Create Account Or Log In
              </Link>
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/login" element={<UserAuth />} />
        <Route path="/logmeal" element={<UploadForm />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/analysis/daily" element={<AnalysisDay data={dummyData}/>} />
          <Route
            path="/analysis/weekly"
            element={<AnalysisWeek data={weekData} />}
          />
      </Routes>
    </BrowserRouter>
  );
}
