import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Routing from "./Routing";

export let USER_CURRENT =null;

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        USER_CURRENT=user;
        setLoggedInUser(user);
        if (location.pathname === "/") {
          navigate("/");
        }
      } else {
        USER_CURRENT=null;
        setLoggedInUser(null);
      }
    });
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          auth={auth}
        />
        <Routing/>
      </header>
    </div>
  );
}
