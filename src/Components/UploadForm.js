import React, { useState } from "react";
import "./UploadForm.css";
import cloud from "../Images/cloud.jpg";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { database /*, storage*/ } from "../firebase";
import { push, ref as databaseRef, set } from "firebase/database";
/*import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";*/

const LOGS_FOLDER_NAME = "Logs";
//const IMAGES_FOLDER_NAME = "Images";

export default function UploadForm({ logInUser }) {
  const currentDate = new Date();

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

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
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
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          headers: { "X-Api-Key": process.env.REACT_APP_CALORIE_NINJA_API_KEY },
        }
      );

      const logsListRef = databaseRef(database, LOGS_FOLDER_NAME);
      const newLogRef = push(logsListRef);
      set(newLogRef, {
        authorEmail: logInUser.email,
        date: formData.sel_DateTime.format("YYYY-MM-DD"),
        /*imageLink: downloadUrl,*/
        description: formData.meal_desc,
        data: response.data.items,
      });
    } catch (error) {
      console.error("Request failed:", error);
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

        <div className="image-upload-container">
          <img src={cloud} alt="Cloud" className="image-upload-image" />
          <br />
          <span className="image-upload-text">Click to Import Food Image</span>
        </div>

        <br />
        <br />

        <div className="form-container">
          <div className="form-row">
            <label htmlFor="item1">Meal Description: </label>
            <input
              type="text"
              id="meal_desc"
              className="meal-input"
              value={formData.meal_desc}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-row">
            <label htmlFor="item1">Item 1: </label>
            <input
              type="text"
              id="item1"
              className="item-input"
              value={formData.item1}
              onChange={handleChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="quantity1">Quantity 1: </label>
            <input
              type="text"
              id="quantity1"
              className="quantity-input"
              value={formData.quantity1}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="item2">Item 2: </label>
            <input
              type="text"
              id="item2"
              className="item-input"
              value={formData.item2}
              onChange={handleChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="quantity2">Quantity 2: </label>
            <input
              type="text"
              id="quantity2"
              className="quantity-input"
              value={formData.quantity2}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="item3">Item 3: </label>
            <input
              type="text"
              id="item3"
              className="item-input"
              value={formData.item3}
              onChange={handleChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="quantity3">Quantity 3: </label>
            <input
              type="text"
              id="quantity3"
              className="quantity-input"
              value={formData.quantity3}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="item4">Item 4: </label>
            <input
              type="text"
              id="item4"
              className="item-input"
              value={formData.item4}
              onChange={handleChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="quantity4">Quantity 4: </label>
            <input
              type="text"
              id="quantity4"
              className="quantity-input"
              value={formData.quantity4}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="item5">Item 5: </label>
            <input
              type="text"
              id="item5"
              className="item-input"
              value={formData.item5}
              onChange={handleChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="quantity5">Quantity 5: </label>
            <input
              type="text"
              id="quantity5"
              className="quantity-input"
              value={formData.quantity5}
              onChange={handleChange}
            />
          </div>
        </div>

        <br />
        <br />

        <button type="submit" className="submit-button">
          Log Meal
        </button>
      </div>
    </form>
  );
}
