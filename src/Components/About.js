import React from "react";

export class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        Placeholder: About page contents{" "}
        {isLoggedIn ? <p>User is logged in</p> : <p>User is not logged in</p>}
      </div>
    );
  }
}
