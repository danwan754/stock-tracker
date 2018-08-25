import React, { Component } from "react";
import cookie from "react-cookies";

import QuoteSearchBar from "./QuoteSearchBar";

class WatchLists extends Component {


  constructor() {
    super();
    this.state = {
      watchlist: cookie.loadAll(),
      dataObj: {}
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    // create string of the symbols
    var symbolArr = [];
    Object.keys(this.state.watchlist).map( (key, value) =>
      { return ( symbolArr.push(key)) }
    )
    var symbols = symbolArr.join(',');
    // fetch batch quotes
    var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + symbols + "&types=quote";
    console.log(url);


    Object.keys(this.state.watchlist)
      .map((symbol, value) => { console.log(symbol) })
    // get the batch quote

    // update dataObj state
  }

  // shouldComponentUpdate() {
  //   console.log(this.props.toAdd);
  //   if (this.props.toAdd) {
  //     this.handleAdd(this.props.symbol);
  //   }
  //   return true;
  // }

  // add stock to watch list
  handleAdd(symbol) {
    console.log("handleAdd triggered");
    var symbol = symbol.toLowerCase();
    if (this.state.watchlist.hasOwnProperty(symbol)) {
      // console.log("cookie already has " + symbol);
      return;
    }
    cookie.save(symbol, true, {path: "/"});
    this.setState( {watchlist: cookie.loadAll()} );
  }

  // remove stock from watch list
  handleRemove(symbol) {
    cookie.remove(symbol);
    this.setState( {watchlist: cookie.loadAll()} );
  }

  render() {
    // console.log("cookie content: " + this.state.watchlist);
    // if (this.props.toAdd) {
    //   this.handleAdd(this.props.symbol);
    // }

    if (typeof this.state.watchlist != "undefined") {
      return (
        <div>
          <h2>Watch Lists</h2>
          <p>Search up stocks to track.</p>
          {Object.keys(this.state.watchlist)
          .map((symbol, value) => { return
            <div key={symbol}>
              <h3>{symbol, value}</h3>
              <input type="submit" value="X" onClick={this.handleRemove} />
            </div>
          })}
          {}
        </div>
      )}
    else {
      return ( <div></div>)
    }
  }
}

export default WatchLists;
