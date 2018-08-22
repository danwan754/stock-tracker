import React, { Component } from "react";

class QuoteResult extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      // quoteObj: this.props.symbol
    }
    this.fetchQuote = this.fetchQuote.bind(this);
  }

  fetchQuote() {
    // if (Object.keys(this.state.quoteObj).length === 0) {
    //   return;
    // }
    // var symbol = this.props.symbol.toLowerCase();
    // var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/quote"
    // console.log(url);
    // // fetch(url)
    // // .then(response => { return response.json() })
    // // .then(data => { this.setState({ quoteObj: data });
    // //   // console.log(data);
    // // });
  }


  render() {
    // console.log(this.props.quoteObj);
    var quoteObj = this.props.quote;
    if (Object.keys(quoteObj).length == 0) {
      // console.log("empty symbol");
      return (
        <div></div>
      )
    }
    else {
      var name = quoteObj.companyName;
      var symbol = quoteObj.symbol;
      var latestPrice = quoteObj.latestPrice;
      var lastestTime = quoteObj.latestTime;
      var latestSource = quoteObj.latestSource;
      var exchange = quoteObj.primaryExchange;

      return (
        <div>
          <br/>
          <h2>({symbol}): {name}</h2>
          <h5>Primary exchange: {exchange}</h5>
          <h3>{latestPrice}</h3>
          <h4>Last Updated on {lastestTime}</h4>
          <h4>Source: {latestSource}</h4>
        </div>
      )
    }
  }
}
export default QuoteResult;
