import React, { useState } from "react";
import "./UserAuth.css";

import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayName, setDisplayName] = useState("");

  const signUp = async (displayName) => {
    if (!displayName || !email || !password) {
      alert("Please do not leave the fields empty");
    }
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName }).then(() => {
      console.log("Profile updated successfully.");
      // Continue with the rest of the app logic here
      setDisplayName("");
      setEmail("");
      setPassword("");
    });
    console.log(user);
  };

  const signIn = async () => {
    if (!email || !password) {
      alert("Please do not leave the fields empty");
    }
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    setDisplayName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-div">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="input-container">
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name Here"
        />
      </div>
      <br />
      <div className="input-container">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Here"
        />
      </div>
      <br />
      <div className="input-container">
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password Here"
        />
      </div>
      <br />
      <br />
      <div className="button-container">
        <button onClick={() => signUp(displayName)}>Sign Up</button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={signIn}>Sign In</button>
      </div>
    </div>
  );
}
