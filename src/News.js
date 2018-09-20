import React, { Component } from "react";

class News extends Component {

  constructor() {
    super();
    this.state = {
      industries: cookie.load('industries'),
      companies: cookie.load('companies'),
      generalToHide: cookie.load('generalToHide'),
      industriesToHide: cookie.load('industriesToHide'),
      companiesToHide: cookie.load('companiesToHide')
    }
  }

  render() {
    return (
      <div>
        <h2>News</h2>
        <p>Select stocks to see related news.</p>
      </div>
    );
  }
}

export default News;
