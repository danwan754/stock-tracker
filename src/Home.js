import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="outter-div">
        <br/>
        <p id="home-intro-p">Quote stocks, make watch lists, view
        analyst ratings, and read latest news that may affect your stocks.</p>
        <br/><br/><br/>
        <p id="home-notice-p">Companies that are available to quote are U.S listed companies that are listed on <a href="https://iextrading.com/" target="_blank">IEX</a>.</p>
      </div>
    );
  }
}

export default Home;
