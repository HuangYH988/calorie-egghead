import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Routing from "./Routing";

export let loggedInUser = null; 

export default function App() {
  const [loggedInUserState, setLoggedInUserState] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loggedInUser = user; // Update the exported variable
        setLoggedInUserState(user); // Update the local state
        if (location.pathname === "/") {
          navigate("/");
        }
      } else {
        loggedInUser = null; // Update the exported variable
        setLoggedInUserState(null); // Update the local state
      }
    });
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar
          
          setLoggedInUser={setLoggedInUserState}
          auth={auth}
        />
        <Routing />
      </header>
    </div>
  );
}
