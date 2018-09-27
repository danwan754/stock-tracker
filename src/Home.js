import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Welcome</h2>
        <br/>
        <p>This web-app will allow you to quote, make watch lists, view
        analyst ratings, and read latest news that may affect your stocks.</p>
        <br/>
        <p>Companies that are available to quote are U.S listed companies that are listed on <a href="https://iextrading.com/" target="_blank">IEX</a>.</p>
      </div>
    );
  }
}

export default Home;
