import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Navbar({ loggedInUser, setLoggedInUser, auth }) {
  return (
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
              LOG OUT
            </Link>
          </Typography>
        ) : (
          <Typography variant="body1" style={{ color: "#063846" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              CREATE ACCOUNT OR LOG IN
            </Link>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
