import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  useNavigate,
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
      {/* <AppBar position="static" style={{ backgroundColor: "#e1f4fa" }}>
        <Toolbar style={{ justifyContent: "flex-start" }}>
          <Button color="inherit" element={Link} to="/">
            <Typography variant="body1" style={{ color: "#063846" }}>
              Home
            </Typography>
          </Button>
          <Button color="inherit" element={Link} to="/About">
            <Typography variant="body1" style={{ color: "#063846" }}>
              About
            </Typography>
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          {loggedInUser ? (
            <Button
              color="inherit"
              onClick={() =>
                signOut(auth).then(() => {
                  setLoggedInUser(null);
                })
              }
              element={Link}
              to="/"
            >
              <Typography variant="body1" style={{ color: "#063846" }}>
                Log Out
              </Typography>
            </Button>
          ) : (
            <Button color="inherit" element={Link} to="/">
              <Typography variant="body1" style={{ color: "#063846" }}>
                Create Account Or Log In
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar> */}
      <BrowserRouter>
        <div>
          <Link className="Navigation-btns" to="/">
            Home
          </Link>
          <Link className="Navigation-btns" to="/About">
            About
          </Link>
          <Link className="Navigation-btns" to="/Login">
            Login
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
