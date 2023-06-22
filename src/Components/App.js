import React from "react";
import "./App.css";

import Analysis from "./Analysis";

import Navbar from "./Navbar";


export default function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* <Navbar /> */}
        <Analysis />

        {/* <UserAuth /> */}
        {/* <UploadForm /> */}
        {/* <button className="login-button">Create Account Or Log In</button> */}

      </header>
    </div>
  );
}

