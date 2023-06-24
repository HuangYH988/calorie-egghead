import "./App.css";
import dic from "../Images/dictionary.jpg";

export default function About() {
  return (
    <div className="picture-container">
      <img src={dic} className="dictionary" alt="dictionary" />
    </div>
  );
}
