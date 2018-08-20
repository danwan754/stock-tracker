import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";

class Quote extends Component {
  render() {
    return (
      <div>
        <h2>Quote</h2>
        <p>Select the stock by inputting the stock ticker symbol,
        or type in company name</p>
        <QuoteSearchBar />
      </div>
    );
  }
}

export default Quote;
