import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";

class Quote extends Component {

  constructor() {
    super();
    this.state = {
      companies: []
    }
  }

  componentDidMount() {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
    .then(response => { return response.json() })
    .then(data => { this.setState({ companies: data });
      // console.log("company 1: " + this.state.companies[1].symbol);
    })
  }

  render() {
    return (
      <div>
        <h2>Quote</h2>
        <p>Select the stock by inputting the stock ticker symbol,
        or type in company name</p>
        <QuoteSearchBar companies={this.state.companies} />
      </div>
    );
  }
}

export default Quote;
