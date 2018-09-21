import React, { Component } from "react";

class QuoteResult extends Component {

  // if parent component pass same symbol as previous, then don't re-render
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.symbol == nextProps.symbol) {
      return false;
    }
    return true;
  }


  render() {
    // console.log("QuoteResult");
    // console.log(typeof this.props.quoteObj);
    // console.log(this.props.)
    var quoteObj = this.props.quoteObj;
    if (Object.keys(quoteObj).length === 0) {
      // console.log("empty symbol");
      return (
        <div></div>
      )
    }
    else {
      var value = "auto";
      var maxWidth = "100px";
      var maxHeight = "100px";

      // // include commas for thousands and strip down decimal places to a max of 2
      // function includeCommasAndTrimDecimalPlaces(number) {
      //   if (number != null) {
      //
      //     var charLength = number.length;
      //
      //     /* count the number of digits before a decimal point */
      //     var count = 0;
      //     for (var i=0; i<charLength; i++) {
      //       if (number[i] != ".") {
      //         count++;
      //       }
      //       else {
      //         break;
      //       }
      //     }
      //
      //     // include commas
      //     //// NEGATIVE????????????
      //     if (count > 3) {
      //       var wholeNumber = number.slice(0, count);
      //       var numCommas = (count - 1) / 3
      //       var newArr = new Array(count);
      //       var countThree = 0;
      //       for (var i=count-1; i>0; i--) {
      //         newArr[i] = number[count - i];
      //       }
      //     }
      //
      //     var decimalNumber = number.slice(count, count + 2);
      //     }
      //
      //     // number = number.toFixed(2);
      //     return number.toLocaleString();
      //   }
      // }

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
      // var latestUpdate = new Date(quoteObj.latestUpdate).toLocaleTimeString();
      // var latestUpdate = new Date(quoteObj.latestUpdate).toTimeString();
      var latestUpdate = new Date(quoteObj.latestUpdate).toLocaleString();
      var exchange = quoteObj.primaryExchange;
      var dayHigh = trimDecimalPlaces(quoteObj.high);
      var dayLow = trimDecimalPlaces(quoteObj.low);
      var changePrice = trimDecimalPlaces(quoteObj.change);
      var changePercent = trimDecimalPlaces(quoteObj.changePercent*100);
      var marketCap = includeCommas(quoteObj.marketCap);
      var peRatio = trimDecimalPlaces(quoteObj.peRatio);
      var latestVolume = includeCommas(quoteObj.latestVolume)
      var week52High = trimDecimalPlaces(quoteObj.week52High);
      var week52Low = trimDecimalPlaces(quoteObj.week52Low);
      var ytdChange = trimDecimalPlaces(quoteObj.ytdChange);
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
        <div>
          <br/>
          <div className="alignRow">
            <div>
              <img id="logo" src={logoURL} />
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
