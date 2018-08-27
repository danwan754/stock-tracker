import React, { Component } from "react";

class WatchListItem extends Component {

  render() {
    // console.log("quoteObj: " + this.props.quoteObj);
    var quoteObj = this.props.quoteObject;

    if (Object.keys(quoteObj).length > 0) {
      // console.log("quoteObj not empty");
      return (
        <div>
          <h3>{quoteObj["symbol"]}</h3>
          <h3>{quoteObj["name"]}</h3>
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
