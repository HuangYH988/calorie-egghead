import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Routing from "./Routing";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
        if (location.pathname === "/") {
          navigate("/");
        }
      } else {
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
        <Routing loggedInUser={loggedInUser} />
      </header>
    </div>
  );
}
