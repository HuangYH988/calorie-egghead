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
        <img src={dic} className="About-container-div2" alt="dictionary" />
      </div>
      <br />
      <br />
      <br />
      <div className="youtube-container">
        <YouTube videoId="WY5QQ-QjlFc" />
      </div>
      <br />
      <br />
      <br />
      <div className="About-container-div">
        Disclaimer: The information, functions, or features provided in this app
        are solely for informational and entertainment purposes. They are not
        intended to be professional medical advice, diagnosis, or treatment. It
        is important to consult with a qualified healthcare professional or
        medical practitioner for any personal medical concerns, conditions, or
        questions. Any reliance on the information, functions, or features
        provided in this app is solely at your own risk. The creators,
        developers, and operators of this app shall not be held liable for any
        actions, decisions, or consequences arising from the use of the
        information, functions, or features provided in this app. This includes,
        but is not limited to, any direct, indirect, incidental, consequential,
        or punitive damages, whether arising from negligence, breach of
        contract, or any other cause of action. By using this app, you
        acknowledge that you have read and understood this disclaimer and agree
        to release the creators, developers, and operators from any liability
        associated with the use of this app.
      </div>
    </div>
  );
}
