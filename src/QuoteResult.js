import React, { Component } from "react";

class QuoteResult extends Component {

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

      // include commas for thousands
      function includeCommas(number) {
        if (number != null) {
          return number.toLocaleString();
        }
      }

      // var name = quoteObj.companyName;
      // var symbol = quoteObj.symbol;
      // var latestPrice = quoteObj.latestPrice.toLocaleString();
      // var lastestTime = quoteObj.latestTime;
      // var exchange = quoteObj.primaryExchange;
      // var dayHigh = quoteObj.high.toLocaleString();
      // var dayLow = quoteObj.low.toLocaleString();
      // var changePrice = quoteObj.change;
      // var changePercent = quoteObj.changePercent;
      // var marketCap = quoteObj.marketCap.toLocaleString();
      // var peRatio = quoteObj.peRatio.toLocaleString();
      // var latestVolume = quoteObj.latestVolume.toLocaleString();
      // var week52High = quoteObj.week52High.toLocaleString();
      // var week52Low = quoteObj.week52Low.toLocaleString();
      // var ytdChange = quoteObj.ytdChange.toLocaleString();
      // var logoURL = this.props.logoURL;

      var name = quoteObj.companyName;
      var symbol = quoteObj.symbol;
      var latestPrice = includeCommas(quoteObj.latestPrice);
      var lastestTime = quoteObj.latestTime;
      var exchange = quoteObj.primaryExchange;
      var dayHigh = includeCommas(quoteObj.high)
      var dayLow = includeCommas(quoteObj.low)
      var changePrice = includeCommas(quoteObj.change);
      var changePercent = includeCommas(quoteObj.changePercent);
      var marketCap = includeCommas(quoteObj.marketCap);
      var peRatio = includeCommas(quoteObj.peRatio);
      var latestVolume = includeCommas(quoteObj.latestVolume)
      var week52High = includeCommas(quoteObj.week52High);
      var week52Low = includeCommas(quoteObj.week52Low);
      var ytdChange = includeCommas(quoteObj.ytdChange);
      var logoURL = this.props.logoURL;

      // var name = quoteObj.companyName;
      // var symbol = quoteObj.symbol;
      // var latestPrice = quoteObj.latestPrice;
      // var lastestTime = quoteObj.latestTime;
      // var exchange = quoteObj.primaryExchange;
      // var dayHigh = quoteObj.high;
      // var dayLow = quoteObj.low;
      // var changePrice = quoteObj.change;
      // var changePercent = quoteObj.changePercent;
      // var marketCap = quoteObj.marketCap;
      // var peRatio = quoteObj.peRatio;
      // var latestVolume = quoteObj.latestVolume;
      // var week52High = quoteObj.week52High;
      // var week52Low = quoteObj.week52Low;
      // var ytdChange = quoteObj.ytdChange;
      // var logoURL = this.props.logoURL;

      if (changePrice > 0) {
        changePrice.toString();
        changePrice = "+" + changePrice;
      }
      if (changePercent > 0) {
        changePercent.toString();
        changePercent = "+" + changePercent;
      }
      changePercent = changePercent + "%";


      return (
        <div className="inline topLeft">
          <br/>
          <img src={logoURL} style={{width: value, height: value, maxHeight: maxHeight, maxWidth: maxWidth, margin: "0 0 0 0"}} />
          <h2>({symbol}): {name}</h2>
          <br/>
          <h2>{latestPrice} <span>{changePrice}  ({changePercent})</span></h2>
          <table className="quoteTable">
            <tbody>
            <tr>
              <th>Share volume</th>
              <td>{latestVolume}</td>
            </tr>
            <tr>
              <th>Day High / Low</th>
              <td>{dayHigh} / {dayLow}</td>
            </tr>
            <tr>
              <th>Market Cap</th>
              <td>{marketCap}</td>
            </tr>
            <tr>
              <th>P/E Ratio</th>
              <td>{peRatio}</td>
            </tr>
            <tr>
              <th>52 Week High / Low</th>
              <td>{week52High} / {week52Low}</td>
            </tr>
            </tbody>
          </table>

          <h4>Last Updated on {lastestTime}</h4>
        </div>
      )
    }
  }
}
export default QuoteResult;
