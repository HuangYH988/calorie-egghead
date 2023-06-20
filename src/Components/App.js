import React from "react";
import "./App.css";
import logo from "../Images/logo.png";

import UploadForm from "./UploadForm";
import Navbar from "./Navbar";
// import { Routes, Route, useNavigate } from "react-router-dom";

// import UserAuth from "./UserAuth";
//import MessageTest from "./Component/MessageTest";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        {/*<img src={logo} className="App-logo" alt="logo" />
        <h3 className="App-logo-title">Calorie Egghead</h3>
        <span className="App-logo-title-desc">
          Track, Count and Analyze your calories.
        </span> */}

        {/* <UserAuth /> */}
        <UploadForm />
        {/* <button className="login-button">Create Account Or Log In</button> */}
      </header>
    </div>
  );
}

/*

<Routes>
  <Route path="/" element={composerAndNewsFeed} />
  <Route path="/login" element={<AuthForm />} />
</Routes>
*/
