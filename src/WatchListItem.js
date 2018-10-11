import React, { Component } from "react";

class WatchListItem extends Component {

  render() {
    // console.log("quoteObj: " + this.props.quoteObj);
    var quoteObj = this.props.quoteObject;
    var symbol = quoteObj.symbol;
    var companyName = quoteObj.companyName;
    var latestPrice = (quoteObj.latestPrice).toFixed(2);
    var changePrice = (quoteObj.change).toFixed(3);
    var changePercent = (quoteObj.changePercent*100).toFixed(2);
    var latestUpdate = new Date(quoteObj.latestUpdate).toLocaleString();
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

    if (Object.keys(quoteObj).length > 0) {
      // console.log("quoteObj not empty");
      // console.log("name : " + quoteObj["companyName"]);
      return (
        <div>
          <div className="watchListItemQuote">
            <p className="symbolName">
              ({symbol}) :  {companyName}
            </p>
            <p id="watchlistPrice" className="currentPrice">{latestPrice}</p>
            <p className={priceMovement}>{changePrice}  ({changePercent})</p>
            <p id="watchlistDateStamp">{latestUpdate}</p>
          </div>
          <div className="watchListItemRemove" id={this.props.watchListName + "-" + symbol} onClick={this.props.handleRemove}>
            <input type="submit" value="X" id={this.props.watchListName + "-" + symbol} onClick={this.props.handleRemove} />
          </div>
        </div>
      )
    }
    else {
      console.log("quoteObj is empty");
      return ( <div></div> )
    }
  }
}

export default WatchListItem;
