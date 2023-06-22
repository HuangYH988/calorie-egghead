import React from "react";


import {Link} from "react-router-dom";

export default class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
   
    //console.log(nutrition);
    return (
      <div>
        
        
          
        
        
        <Link to="/analysis/daily" style={{ textDecoration: "none" }}>
            Daily
          </Link>
          <Link to="/analysis/weekly" style={{ textDecoration: "none" }}>
            Weekly
          </Link>
        
      </div>
    );
  }
}
