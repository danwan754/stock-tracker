import React, { Component } from "react";

class WatchListItem extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {
    let arr = event.target.id.split("-");
    this.props.handleRemove({
      watchList: arr[0],
      symbol: arr[1]
    })
  }

  render() {
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
