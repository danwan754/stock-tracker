import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Welcome</h2>
        <p>This web-app will help you plan your stock strategies by
        allowing you to quote, make watch lists, view
        analyst ratings, and read latest news that may affect your stocks.</p>
        <br/>
        <p>Companies that are available to quote are U.S listed companies that are listed on IEX.</p>
      </div>
    );
  }
}

export default Home;
