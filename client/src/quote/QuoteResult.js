import React, { Component } from "react";

class QuoteResult extends Component {

  // if parent component pass same symbol as previous, then don't re-render
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.symbol === nextProps.symbol) {
      return false;
    }
    return true;
  }


  render() {
    var quoteObj = this.props.quoteObj;
    if (Object.keys(quoteObj).length === 0) {
      return (
        <div></div>
      )
    }
    else {

      function includeCommas(number) {
        if (number != null) {
          return number.toLocaleString();
        }
      }

      function trimDecimalPlaces(number) {
        if (number != null) {
          return number.toFixed(2);
        }
      }

      var name = quoteObj.companyName;
      var symbol = quoteObj.symbol;
      var latestPrice = trimDecimalPlaces(quoteObj.latestPrice);
      var latestUpdate = new Date(quoteObj.latestUpdate).toLocaleString();
      var dayHigh = trimDecimalPlaces(quoteObj.high);
      var dayLow = trimDecimalPlaces(quoteObj.low);
      var changePrice = trimDecimalPlaces(quoteObj.change);
      var changePercent = trimDecimalPlaces(quoteObj.changePercent*100);
      var marketCap = includeCommas(quoteObj.marketCap);
      var peRatio = trimDecimalPlaces(quoteObj.peRatio);
      var latestVolume = includeCommas(quoteObj.latestVolume)
      var week52High = trimDecimalPlaces(quoteObj.week52High);
      var week52Low = trimDecimalPlaces(quoteObj.week52Low);
      var logoURL = this.props.logoURL;

      var priceMovement = "loss";
      if (changePrice > 0) {
        changePrice.toString();
        changePrice = "+" + changePrice;
        priceMovement = "gain";
      }

      if (changePercent > 0) {
        changePercent.toString();
        changePercent = "+" + changePercent;
      }
      changePercent = changePercent + "%";


      return (
        <div className="inline quote">
          <br/>
          <div className="alignRow">
            <div>
              <img id="logo" src={logoURL} alt="" />
            </div>
            <div className="verticalCenter">
              <p>({symbol}): {name}</p>
            </div>
          </div>
          <br/>
          <p id="quotePrice" className="currentPrice">{latestPrice}</p>
          <p className={priceMovement}>{changePrice}  ({changePercent})</p>
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
          <p id="latestUpdate">Last Updated on {latestUpdate}</p>
        </div>
      )
    }
  }
}
export default QuoteResult;
