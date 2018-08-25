import React, { Component } from "react";

class QuoteResult extends Component {

  // shouldComponentUpdate() {
  // }

  render() {
    // console.log("quoteresult");
    // console.log(this.props.quoteObj);
    var quoteObj = this.props.quote;
    if (Object.keys(quoteObj).length == 0) {
      // console.log("empty symbol");
      return (
        <div></div>
      )
    }
    else {
      var value = "auto";
      var maxWidth = "100px";
      var maxHeight = "100px";

      var name = quoteObj.companyName;
      var symbol = quoteObj.symbol;
      var latestPrice = quoteObj.latestPrice;
      var lastestTime = quoteObj.latestTime;
      var exchange = quoteObj.primaryExchange;
      var dayHigh = quoteObj.high;
      var dayLow = quoteObj.low;
      var changePrice = quoteObj.change;
      var changePercent = quoteObj.changePercent;
      var logoURL = this.props.logoURL;

      if (changePrice > 0) {
        changePrice.toString();
        changePrice = "+" + changePrice;
      }
      if (changePercent > 0) {
        changePercent.toString();
        changePercent = "+" + changePercent + "%";
      }

      return (
        <div>
          <br/>
          <div>
          <img src={logoURL} style={{width: value, height: value, maxHeight: maxHeight, maxWidth: maxWidth}} />
          <h2 style={{display: "inline"}}>({symbol}): {name}</h2>
          </div>
          <br/>
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
