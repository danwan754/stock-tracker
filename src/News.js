import React, { Component } from "react";

class News extends Component {

  constructor() {
    super();
    this.state = {
      industries: cookie.loadAll(),
      companies: cookie.load(companies),
      generalToHide: cookie.load(),
      industriesToHide: cookie.load(),
      companiesToHide: cookie.load()
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
