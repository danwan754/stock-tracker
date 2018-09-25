import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";
import WatchListItem from "./WatchListItem";
import QuoteFooter from "./QuoteFooter";
import cookie from "react-cookies";
import './styles.css'


class Quote extends Component {

  constructor() {
    super();
    this.state = {
      symbol: '',
      watchlist: cookie.load('watchlist'), // string of symbols; ex.: "aapl,amzn,tsl"
      batchObj: {},
      quoteObject: {},
      newsObject: {},
      toHide: true,
    }
    this.handleSelectedCompany = this.handleSelectedCompany.bind(this);
    this.handleAddToWatchlist = this.handleAddToWatchlist.bind(this);
    this.handleRemoveFromWatchList = this.handleRemoveFromWatchList.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.fetchWatchListQuotes = this.fetchWatchListQuotes.bind(this);
  }

  componentDidMount() {
    this.fetchWatchListQuotes();
  }

  fetchWatchListQuotes() {
    // check if watchlist is empty
    if (this.state.watchlist === undefined || this.state.watchlist == '') {
      return;
    }

    // // create string of the symbols
    // var symbolArr = this.state.watchlist.split(',');
    // console.log("watchlist: ");
    // console.log(this.state.watchlist);
    // fetch batch quotes
    var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + this.state.watchlist + "&types=quote";
    // console.log(url);

    // Object.keys(this.state.watchlist)
    //   .map((symbol, value) => { console.log(symbol) })

    // get the batch quote
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState( {batchObj: data} ) } );
  }

  handleAddToWatchlist() {
    // console.log("symbol: " + this.state.symbol);
    if ( !(this.state.symbol.toUpperCase() in this.state.batchObj) && (this.state.symbol != '') ) {
      // console.log("symbol: " + this.state.symbol);

      let symbolString;
      if (this.state.watchlist === undefined || this.state.watchlist == '') {
        symbolString = this.state.symbol;
      }
      else {
        let symbolArr = this.state.watchlist.split(",");
        symbolArr.push(this.state.symbol);
        symbolString = symbolArr.toString();
      }
      console.log(symbolString);
      cookie.save("watchlist", symbolString, {path: "/"});
      this.setState( {watchlist: symbolString,
                      toHide: true} ); // hides add to watchlist button

      // this.fetchWatchListQuotes();
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
      console.log(this.state.symbol + " already on watch list");
    }
  }

  // remove stock from watch list
  handleRemoveFromWatchList(event) {

    var symbol = event.target.id.toLowerCase();
    // console.log(symbol);
    let symbolArr = this.state.watchlist.split(",");
    // console.log(symbolArr);
    var index = symbolArr.indexOf(symbol);
    if (index > -1) {
      symbolArr.splice(index, 1);
    }
    // console.log(symbolArr);
    let symbolString = symbolArr.toString();
    cookie.save("watchlist", symbolString, {path: "/"});

    var batchObj = this.state.batchObj;
    delete batchObj[symbol.toUpperCase()];

    this.setState( {watchlist: symbolString,
                    batchObj: batchObj} );
  }

  handleRefresh(event) {
    this.fetchWatchListQuotes();
  }

  handleSelectedCompany(symbol) {
    this.setState( {symbol: symbol} );

    if (symbol.toUpperCase() in this.state.batchObj) {
      // hide the 'add to watchlist' button
      this.setState( {toHide: true});
    }
    else {
      // reveal the 'add to watchlist' button
      this.setState( {toHide: false});
    }
  }

  render() {
    // console.log("quoteComponent");
    // console.log("batchObj: ");
    // console.log(this.state.batchObj);

    var addMessage = "Add (" + this.state.symbol.toUpperCase() + ") to watch list";
    return (
      <div>
        <h2>Quote</h2>
        <p>Select the stock by typing the company name</p>
        <input type="submit" id="addBtn" hidden={this.state.toHide} value={addMessage} onClick={this.handleAddToWatchlist} />
        <QuoteSearchBar symbol={this.handleSelectedCompany} />
        <br/><br/><hr />
        <div className="watchListContainer">
          <h3 id="inline">Watch List</h3>
          <div id="refreshButton" onClick={this.handleRefresh}>Refresh Watch List</div>
          {Object.keys(this.state.batchObj).map((symbol, value) => {
            // console.log(this.state.batchObj[symbol]["quote"]);
            return (
              <div key={symbol} id={symbol} className="watchListItem" onClick={this.handleClick}>
                <WatchListItem quoteObject={this.state.batchObj[symbol]["quote"]} />
                <div className="watchListItemRemove" id={symbol} onClick={this.handleRemoveFromWatchList}>
                  <input type="submit" value="X" id={symbol} onClick={this.handleRemoveFromWatchList} />
                </div>
              </div>
            )
          })}
        </div>
        <QuoteFooter />
      </div>
    );
  }
}

export default Quote;
