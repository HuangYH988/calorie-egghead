import React from "react";
import "./App.css";
//import logo from "../Images/logo.png";
import Analysis from "./Analysis";
//import UploadForm from "./UploadForm";
import Navbar from "./Navbar";


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Analysis />

        {/* <UserAuth /> */}
        {/* <UploadForm /> */}
        {/* <button className="login-button">Create Account Or Log In</button> */}
      </header>
    </div>
  );
}


