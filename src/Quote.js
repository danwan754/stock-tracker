import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";
import WatchListItem from "./WatchListItem";
import cookie from "react-cookies";


class Quote extends Component {

  constructor() {
    super();
    this.state = {
      symbol: '',
      watchlist: cookie.loadAll(),
      batchObj: {},
      quoteObject: {},
      newsObject: {}
    }
    this.handleSelectedCompany = this.handleSelectedCompany.bind(this);
    this.handleAddToWatchlist = this.handleAddToWatchlist.bind(this);
    this.handleRemoveFromWatchList = this.handleRemoveFromWatchList.bind(this);
  }

  componentDidMount() {
    // // get all the companies from cookie
    // var watchlist = cookie.loadAll();

    if (Object.keys(this.state.watchlist).length == 0) {
      return;
    }

    // create string of the symbols
    var symbolArr = [];
    Object.keys(this.state.watchlist).map( (key, value) =>
      { return ( symbolArr.push(key)) }
    )
    var symbols = symbolArr.join(',');
    // fetch batch quotes
    var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + symbols + "&types=quote";
    // console.log(url);

    Object.keys(this.state.watchlist)
      .map((symbol, value) => { console.log(symbol) })

    // get the batch quote
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState( {batchObj: data} ) } );
  }

  handleAddToWatchlist() {
    // console.log("symbol: " + this.state.symbol);
    if ( !(this.state.symbol.toUpperCase() in this.state.batchObj) && (this.state.symbol != '') ) {
      console.log("symbol: " + this.state.symbol);
      cookie.save(this.state.symbol, "true", {path: "/"});
      // this.setState( {watchlist: cookie.loadAll()} );

      // fetch quote data and append it to batchObj
      var symbol = this.state.symbol.toLowerCase();
      var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/quote";
      fetch(url)
      .then(response => { return response.json() })
      .then(data => {
        var batchObj = this.state.batchObj;
        var symbolCaps = symbol.toUpperCase();
        batchObj[symbolCaps] = {};
        batchObj[symbolCaps]["quote"] = data;
        // console.log(batchObj);
        return this.setState( {batchObj: batchObj} );
      });
    }
    else {
      console.log(this.state.symbol + " already exists in batchObj");
    }
  }

  // remove stock from watch list
  handleRemoveFromWatchList(event) {

    // var symbol = symbol.toLowerCase();
    var symbol = event.target.id.toLowerCase();
    console.log("id: " + symbol);

    cookie.remove(symbol);
    // this.setState( {watchlist: cookie.loadAll()} );
    var batchObj = this.state.batchObj;
    delete batchObj[symbol.toUpperCase()];
    this.setState( {batchObj: batchObj} );
  }

  handleSelectedCompany(symbol) {
    this.setState( {symbol: symbol} );
  }

  render() {
    return (
      <div>
        <h2>Quote</h2>
        <p>Select the stock by typing the company name</p>
        <QuoteSearchBar symbol={this.handleSelectedCompany} />
        <input type="submit" value="Add to watch list" onClick={this.handleAddToWatchlist}/>
        <br />
        <h2>Watch List</h2>
        {Object.keys(this.state.batchObj).map((symbol, value) => {
          // console.log(this.state.batchObj[symbol]["quote"]);
          return (
            <div key={symbol}>
              <WatchListItem quoteObject={this.state.batchObj[symbol]["quote"]} />
              <input type="submit" value="X" id={symbol} onClick={this.handleRemoveFromWatchList}/>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Quote;
