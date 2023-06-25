import React, { useState, useEffect } from "react";
import "./Hist.css";
import Card from "react-bootstrap/Card";
import { database } from "../firebase";
import { onChildAdded, ref as databaseRef } from "firebase/database";

const LOGS_FOLDER_NAME = "Logs";

export default function Hist({ logInUser }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const logsRef = databaseRef(database, LOGS_FOLDER_NAME);
    const unsubscribe = onChildAdded(logsRef, (data) => {
      if (data.val().authorEmail === logInUser.email) {
        setLogs((prevLogs) => [
          ...prevLogs,
          { key: data.key, val: data.val() },
        ]);
      }
    });

    return () => unsubscribe();
  }, [logInUser.email]);

  let logCards = logs.map((log) => {
    const logData = log.val.data;
    const slicedData =
      logData && Array.isArray(logData) ? logData.slice(0, 5) : [];
    const sumCalories = Math.round(
      slicedData.reduce((totalCalories, item) => {
        if (item && item.calories) {
          return totalCalories + item.calories;
        }
        return totalCalories;
      }, 0)
    );

    return (
      <Card key={log.key} bg="dark" text="light" className="log-card">
        <Card.Text className="card-text">
          {log.val.date}: {log.val.description}
        </Card.Text>
        <Card.Body>
          <Card.Img
            variant="top"
            src={log.val.imageLink}
            className="max-height-image"
          />
          <Card.Text className="card-text">Calories: {sumCalories}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  logCards.reverse();

  return (
    <div>
      <span id="logs-heading">ALL LOGGED MEALS BELOW</span>
      {logs.length > 0 ? (
        <div className="vertical-scrollable-card-deck-container">
          <div className="vertical-scrollable-card-deck">{logCards}</div>
        </div>
      ) : (
        <p className="empty-page-text">No logs yet.</p>
      )}
    </div>
  );
}
