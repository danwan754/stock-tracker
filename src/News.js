import React, { Component } from "react";
import cookie from "react-cookies";

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

  ComponentDidMount() {
    updateGeneralNews();
    updateIndustryNews();
    updateCompanyNews();
  }

  updateGeneralNews() {
    let url;
  }

  // toggles hiding of section of news (general, industries, companies)
  handleHideClick() {
    return;
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
