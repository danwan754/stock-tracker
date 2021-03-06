import React, { Component } from "react";

class WatchLists extends Component {




  render() {
    console.log("watch lists component");

    var batchObj = this.props.batchObj;

    if (typeof batchObj != "undefined") {

      return (
        <div>
          <h2>Watch Lists</h2>
          <p>Search up stocks to track.</p>
          {Object.keys(batchObj)
          .map((symbol, value) => { return (
            <div key={symbol}>
              <h3>{batchObj[symbol]["quote"]["symbol"]}</h3>
              <h3>{batchObj[symbol]["quote"]["name"]}</h3>
              <input type="submit" value="X" onClick={this.props.toRemove(batchObj[symbol]["quote"]["symbol"])} />
            </div>
          )})}
        </div>
      )}
    else {
      return ( <div></div>)
    }
  }
}

export default WatchLists;
