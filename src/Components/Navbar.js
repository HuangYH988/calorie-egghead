import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { BrowserRouter,Link } from "react-router-dom";
import Routing from "./Routing";

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  //const navigate = useNavigate();
  
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
    </AppBar><Routing state={loggedInUser}/></BrowserRouter>
  );
}
