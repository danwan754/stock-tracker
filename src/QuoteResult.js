import React, { Component } from "react";

class QuoteResult extends Component {

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
      var exchange = quoteObj.primaryExchange;
      var dayHigh = quoteObj.high;
      var dayLow = quoteObj.low;
      var changePrice = quoteObj.change;
      var changePercent = quoteObj.changePercent;

      return (
        <div>
          <br/>
          <h2>({symbol}): {name}</h2>
          <h5>Primary exchange: {exchange}</h5>
          <h2>{latestPrice} <span>{changePrice}  ({changePercent})</span></h2>
          <h4>Day High: {dayHigh}</h4>
          <h4>Day Low: {dayLow}</h4>
          <h4>Last Updated on {lastestTime}</h4>
        </div>
      )
    }
  }
}
export default QuoteResult;
