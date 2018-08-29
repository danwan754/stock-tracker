import React, { Component } from "react";

class WatchListItem extends Component {

  render() {
    // console.log("quoteObj: " + this.props.quoteObj);
    var quoteObj = this.props.quoteObject;
    var symbol = quoteObj.symbol;
    var companyName = quoteObj.companyName;
    var changePrice = quoteObj.change;
    var changePercent = quoteObj.changePercent;

    if (changePrice > 0) {
      changePrice.toString();
      changePrice = "+" + changePrice;
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
          <h3>
            ({symbol}) :  {companyName}
          </h3>
          <h4>{changePrice}  ({changePercent})</h4>
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
