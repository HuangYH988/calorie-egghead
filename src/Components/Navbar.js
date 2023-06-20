import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  
  BrowserRouter,
  Routes,
  Link,
  Route,
} from "react-router-dom";
import { About } from "./About";
import Error from "./Error";
import Home from "./Home";
import UserAuth from "./UserAuth";

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  // const navigate = useNavigate();

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
    <div>
   
      <BrowserRouter>
        <AppBar position="static" style={{ backgroundColor: "#e1f4fa" }}>
          <Toolbar style={{ justifyContent: "flex-start" }}>
            <Link className="Navigation-btns" to="/">
              <Typography variant="body1" style={{ color: "#063846" }}>
                Home
              </Typography>
            </Link>
            <Link className="Navigation-btns" to="/About">
              <Typography variant="body1" style={{ color: "#063846" }}>
                About
              </Typography>
            </Link>
            <div style={{ flexGrow: 1 }}></div>
            {loggedInUser ? (
             <Link className="Navigation-btns" to="/" onClick={() =>
                signOut(auth).then(() => {
                  setLoggedInUser(null);
                })
              }>
                <Typography variant="body1" style={{ color: "#063846" }}>
                  Log Out
                </Typography>
              </Link>
            ) : (
              <Link className="Navigation-btns" to="/login">
                <Typography variant="body1" style={{ color: "#063846" }}>
                  Create Account Or Log In
                </Typography>
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About isLoggedIn={loggedInUser}/>} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
