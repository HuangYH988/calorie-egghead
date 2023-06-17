import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
//import { useNavigate } from "react-router-dom";

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
    <AppBar position="static" style={{ backgroundColor: "#e1f4fa" }}>
      <Toolbar style={{ justifyContent: "flex-start" }}>
        <Button color="inherit">
          <Typography variant="body1" style={{ color: "#063846" }}>
            Home
          </Typography>
        </Button>
        <Button color="inherit">
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
          >
            <Typography variant="body1" style={{ color: "#063846" }}>
              Log Out
            </Typography>
          </Button>
        ) : (
          <Button color="inherit">
            <Typography variant="body1" style={{ color: "#063846" }}>
              Create Account Or Log In
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
