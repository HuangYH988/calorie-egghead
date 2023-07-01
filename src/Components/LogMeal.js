import React, { useState, useRef } from "react";
import "./LogMeal.css";
import cloud from "../Images/cloud.jpg";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import InputForms from "./InputForms";

import { database, storage } from "../firebase";
import { push, ref as databaseRef, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const LOGS_FOLDER_NAME = "Logs";
const IMAGES_FOLDER_NAME = "Images";

export default function UploadForm({ logInUser }) {
  const currentDate = new Date();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const [downloadUrl, setdownloadUrl] = useState(null);
  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    sel_DateTime: dayjs(currentDate.toISOString().slice(0, 16)),
    meal_desc: "",
    item1: "",
    quantity1: "",
    item2: "",
    quantity2: "",
    item3: "",
    quantity3: "",
    item4: "",
    quantity4: "",
    item5: "",
    quantity5: "",
  });

  const setErrorState = (error) => {
    setErrorMessage(error.message);
  };

  const handleChange = (event) => {
    setSubmitFlag(false);
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(URL.createObjectURL(file));

    const fileFireBaseRef = storageRef(
      storage,
      `${IMAGES_FOLDER_NAME}/${file.name}`
    );

    uploadBytes(fileFireBaseRef, file).then(() => {
      getDownloadURL(fileFireBaseRef).then((downloadUrl) => {
        setdownloadUrl(downloadUrl);
      });
    });
  };

  const handleClick = () => {
    setSubmitFlag(false);
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const query =
      formData.quantity1 +
      " " +
      formData.item1 +
      " and " +
      formData.quantity2 +
      " " +
      formData.item2 +
      " and " +
      formData.quantity3 +
      " " +
      formData.item3 +
      " and " +
      formData.quantity4 +
      " " +
      formData.item4 +
      " and " +
      formData.quantity5 +
      " " +
      formData.item5;

    try {
      setSubmitFlag(true);
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          headers: { "X-Api-Key": process.env.REACT_APP_CALORIE_NINJA_API_KEY },
        }
      );

      const dateObj = new Date(formData.sel_DateTime);
      const dayOfWeek = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const logsListRef = databaseRef(database, LOGS_FOLDER_NAME);
      const newLogRef = push(logsListRef);
      set(newLogRef, {
        authorEmail: logInUser.email,
        date: formData.sel_DateTime.format("YYYY-MM-DD"),
        dayOfWeek: dayOfWeek,
        imageLink: downloadUrl,
        description: formData.meal_desc,
        data: response.data.items,
      });

      setSelectedPhoto(null);
      setFormData({
        sel_DateTime: dayjs(currentDate.toISOString().slice(0, 16)),
        meal_desc: "",
        item1: "",
        quantity1: "",
        item2: "",
        quantity2: "",
        item3: "",
        quantity3: "",
        item4: "",
        quantity4: "",
        item5: "",
        quantity5: "",
      });
    } catch (error) {
      setErrorState(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <br />
        <br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            label="Input Date & Time of Food Intake"
            defaultValue={dayjs(currentDate.toISOString().slice(0, 16))}
            value={formData.sel_DateTime}
          />
        </LocalizationProvider>

        <br />
        <br />

        <div className="image-upload-container" onClick={handleClick}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          {selectedPhoto ? (
            <img
              src={selectedPhoto}
              alt="Selected"
              className="selectedPhoto-image"
            />
          ) : (
            <div>
              <img src={cloud} alt="Cloud" className="image-upload-image" />
              <br />
              <span className="image-upload-text">
                Click to Import Food Image
              </span>
            </div>
          )}
        </div>

        <br />
        <br />

        <InputForms formData={formData} handleChange={handleChange} />

        <br />
        <br />

        <button type="submit" className="submit-button">
          Log Meal
        </button>

        <br />
        <br />
        <br />

        <p className="error-msg">
          {SubmitFlag === true
            ? errorMessage
              ? `Error message: ${errorMessage}`
              : `Meal Logged Successfully!`
            : null}
        </p>
      </div>
    </form>
  );
}
