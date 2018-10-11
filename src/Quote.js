import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";
import WatchListsMainContainer from "./WatchListsMainContainer";
import QuoteFooter from "./QuoteFooter";
import cookie from "react-cookies";
import './styles.css'


class Quote extends Component {

  constructor() {
    super();
    this.state = {
      symbol: '',
      // watchlist: cookie.load('watchlist'), // string of symbols; ex.: "aapl,amzn,tsl"
      watchListsArrsObj: {},
      watchListsArr: [],
      quoteObject: {},
      newsObject: {},
      toHide: true,
    }
    this.handleSelectedCompany = this.handleSelectedCompany.bind(this);
    this.handleAddToWatchlist = this.handleAddToWatchlist.bind(this);
    this.handleRemoveFromWatchList = this.handleRemoveFromWatchList.bind(this);
    // this.handleRefresh = this.handleRefresh.bind(this);
    this.getWatchLists = this.getWatchLists.bind(this);
  }

  componentDidMount() {
    this.getWatchLists();
  }

  // get watch lists from cookie and reformat to like { technology list: ["aapl", "amzn"], energy list: ["enb"] }
  getWatchLists() {
    // cookies object with watch list names as entries; ex.: {cookie: { technology list: "aapl,amzn", energy: "enb" } }
    let watchListsObj = cookie.loadAll();
    // console.log("watchListsObj: ");
    // console.log(watchListsObj);

    // check if watchlists cookie is empty
    if (watchListsObj === undefined || Object.keys(watchListsObj).length === 0) {
      return;
    }

    // if there are multiple watch lists, there exists an outter 'cookie' property that needs to be removed
    if (Object.keys(watchListsObj)[0] === 'cookies') {
      watchListsObj = watchListsObj["cookies"]; // format like: { technology list: "aapl,amzn", energy list: "enb" }
    }
    // console.log("OBJ: ");
    // console.log(watchListsObj);

    // convert watchlistsObj into format like: { technology: ["aapl", "amzn"], energy: ["enb"] }
    let watchListsArrsObj = {};
    for (var i=0; i<Object.keys(watchListsObj).length; i++) {
      let watchList = Object.keys(watchListsObj)[i];
      // console.log(watchList);
      let watchListString = watchListsObj[watchList];
      // console.log(watchListString);
      watchListsArrsObj[watchList] = watchListString.split(",");
      // console.log("should be object of arrays:");
      // console.log(watchListsArrsObj);
    }

    this.setState( {watchListsArrsObj: watchListsArrsObj,
                    watchListsArr: Object.keys(watchListsObj)} );
  }


  handleAddToWatchlist(watchListAndSymbolObj) {
    // console.log("symbol: " + this.state.symbol);
    // if ( !(this.state.symbol.toUpperCase() in this.state.batchObj) && (this.state.symbol !== '') ) {
    if (!(Object.keys(watchListAndSymbolObj).length === 0)) {

      let watchList = watchListAndSymbolObj.watchList;
      let symbol = watchListAndSymbolObj.symbol;

      if (!this.state.watchListsArr.includes(watchList)) {
        console.log("created new watchlist: " + watchList);
        cookie.save(watchList, symbol, {path: "/"});
        let tempObj = this.state.watchListsArrsObj;
        let tempArr = this.state.watchListsArr;
        tempObj[watchList] = [symbol];
        tempArr.push(watchList);
        this.setState({
          watchListsArrsObj: tempObj,
          watchListsArr: tempArr
        })
        return;
      }

      console.log("Adding symbol: " + watchListAndSymbolObj.symbol + " to " + watchList);

      // do not add symbol to watch list if it is already there
      if (this.state.watchListsArrsObj[watchList].includes(symbol)) {
        console.log(symbol + " already in " + watchList + " so was not added again");
        return;
      }

      /* saving symbol to the appropiate watch list cookie */
      let symbolString;
      let symbolArr;
      if (this.state.watchListsArrsObj[watchList].length === 0) {
        symbolString = symbol;
      }
      else {
        symbolArr = this.state.watchListsArrsObj[watchList];
        // console.log("should be array:");
        // console.log(symbolArr);
        symbolArr.push(symbol);
        symbolString = symbolArr.toString();
      }
      // console.log("symbolString: " + symbolString);
      cookie.save(watchList, symbolString, {path: "/"});

      let tempObj = this.state.watchListsArrsObj;
      tempObj[watchList] = symbolArr;
      this.setState( {watchListsArrsObj: tempObj,
                      toHide: true} ); // hides add to watchlist button
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
    cookie.save("watchlists", symbolString, {path: "/"});

    var batchObj = this.state.batchObj;
    delete batchObj[symbol.toUpperCase()];

    this.setState( {watchlist: symbolString,
                    batchObj: batchObj} );
  }

  // handleRefresh(event) {
  //   event.target.blur(); // get rid of focus on button
  //   this.fetchWatchListQuotes();
  // }

  handleSelectedCompany(symbol) {
    this.setState( {symbol: symbol} );

    let isInList = false;
    for (var key in this.state.watchListsArrsObj) {
      // console.log(key, this.state.watchListsArrsObj[key]);
      if (this.state.watchListsArrsObj[key].includes(symbol.toUpperCase())) {
        isInList = true;
        break;
      }
   }

    if (isInList) {
      // hide the 'add to watchlist' button
      this.setState( {toHide: true});
      console.log(symbol + " already in list, dont show ADD Button");
    }
    else {
      // reveal the 'add to watchlist' button
      this.setState( {toHide: false});
      console.log(symbol + " not in list, show ADD Button");
    }
  }


  render() {
    return (
      <div>
        <h2>Quote</h2>
        <br/>
        <p>Select the stock by typing the company name</p>
        <QuoteSearchBar watchListsArr={this.state.watchListsArr} symbol={this.handleSelectedCompany} toHideButton={this.state.toHide} addToList={this.handleAddToWatchlist} />
        <br/><br/><hr />
        <WatchListsMainContainer watchListsObj={this.state.watchListsArrsObj} handleRemove={this.handleRemoveFromWatchList} />
        <QuoteFooter />
      </div>
    );
  }
}

export default Quote;
