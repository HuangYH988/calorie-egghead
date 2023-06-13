import logo from "./logo.png";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="App-logo-title">Calorie Egghead</h3>
        <span className="App-logo-title-desc">
          Track, Count and Analyze your calories.
        </span>
        <button className="login-button">Create Account Or Sign In</button>
      </header>
    </div>
  );
}
