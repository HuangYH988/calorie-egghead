import "./App.css";
import dic from "../Images/dictionary.jpg";
import YouTube from "react-youtube";

export default function About() {
  return (
    <div className="About-container">
      <br />
      <br />
      <br />
      <div className="About-container-div">
        Calorie Egghead is an app designed to help you Track, Count, and Analyze
        your calorie intake. Track refers to using the "Log Meal" feature to log
        all the food you consume throughout the day. Count refers to using the
        "History" feature to automatically display the number of calories
        consumed in each meal. Analyze refers to using the "Analysis" feature to
        examine trends and patterns in your calorie consumption. Using Calorie
        Egghead feels akin to having a personal consultant guiding you in
        managing your calorie intake regimen.
      </div>
      <br />
      <br />
      <br />
      <div>
        <img src={dic} className="About-container-div" alt="dictionary" />
      </div>
      <br />
      <br />
      <br />
      <div className="youtube-container">
        <YouTube videoId="WY5QQ-QjlFc" />
      </div>
    </div>
  );
}
