import logo from "./logo.png";
import "./App.css";
import MessageTest from "./Component/MessageTest";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="App-logo-title">Calorie Egghead</h3>
        <span className="App-logo-title-desc">
          Track, Count and Analyze your calories.
          {console.log("test", Date.now())}
          <MessageTest displayName="MZ"/>
        </span>
        <button className="login-button">Create Account Or Sign In</button>
        
      </header>
    </div>
  );
}
