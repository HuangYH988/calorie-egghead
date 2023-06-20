import logo from "../Images/logo.png";
import "./App.css";

//import MessageTest from "./Component/MessageTest";



export default function Home() {
  return (
    <div >
      
        
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="App-logo-title">Calorie Egghead</h3>
        <span className="App-logo-title-desc">
          Track, Count and Analyze your calories.
          
          
         
        </span>

        

     
    </div>
  );
}