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
      toHide: true,
      toAdd: true, // tell child component to add symbol to watch list
      newWatchListAndSymbolObj: {watchList: '', symbol: ''} // the symbol to be added to the watch list by child component
    }
    this.handleSelectedCompany = this.handleSelectedCompany.bind(this);
    this.handleAddToWatchlist = this.handleAddToWatchlist.bind(this);
    this.handleRemoveFromWatchList = this.handleRemoveFromWatchList.bind(this);
    this.getWatchLists = this.getWatchLists.bind(this);
  }

  componentDidMount() {
    this.getWatchLists();
  }

  // get watch lists from cookie and reformat to like { technology list: ["aapl", "amzn"], energy list: ["enb"] }
  getWatchLists() {
    // cookies object with watch list names as entries; ex.: {cookie: { technology list: "aapl,amzn", energy: "enb" } }
    let watchListsObj = cookie.loadAll();

    // check if watchlists cookie is empty
    if (watchListsObj === undefined || Object.keys(watchListsObj).length === 0) {
      return;
    }

    // if there are multiple watch lists, there exists an outter 'cookie' property that needs to be removed
    if (Object.keys(watchListsObj)[0] === 'cookies') {
      watchListsObj = watchListsObj["cookies"]; // format like: { technology list: "aapl,amzn", energy list: "enb" }
    }

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

    if (!(Object.keys(watchListAndSymbolObj).length === 0)) {

      let watchList = watchListAndSymbolObj.watchList;
      let symbol = watchListAndSymbolObj.symbol;

      // if watch list does not exist, create it and add symbol to it
      if (!this.state.watchListsArr.includes(watchList)) {
        cookie.save(watchList, symbol, {path: "/"});
        console.log("created new watchlist: " + watchList);
        console.log("also added symbol: " + symbol + " to " + watchList);
        let tempObj = this.state.watchListsArrsObj;
        let tempArr = this.state.watchListsArr;
        tempObj[watchList] = [symbol];
        tempArr.push(watchList);
        this.setState({
          watchListsArrsObj: tempObj,
          watchListsArr: tempArr,
          newWatchListAndSymbolObj: watchListAndSymbolObj
        })
        return;
      }

      // do not add symbol to watch list if it is already there
      if (this.state.watchListsArrsObj[watchList].includes(symbol)) {
        console.log(symbol + " already in " + watchList + " so was not added again");
        return;
      }

      /* saving symbol to the appropiate watch list cookie */
      let symbolString;
      let symbolArr;
      if (this.state.watchListsArrsObj[watchList][0] === '') {
        symbolString = symbol;
      }
      else {
        symbolArr = this.state.watchListsArrsObj[watchList];
        // console.log("should be array:");
        // console.log(symbolArr);
        symbolArr.push(symbol);
        symbolString = symbolArr.toString();
      }
      cookie.save(watchList, symbolString, {path: "/"});
      console.log("Added symbol: " + watchListAndSymbolObj.symbol + " to " + watchList);

      let tempObj = JSON.parse(JSON.stringify(this.state.watchListsArrsObj));
      // let tempArr = JSON.parse(JSON.stringify(symbolArr));
      // tempObj[watchList] = tempArr;
      tempObj[watchList] = symbolArr;
      this.setState({
        watchListsArrsObj: tempObj,
        toHide: true, // hides add to watchlist button
        watchListAndSymbolObj: watchListAndSymbolObj
      });
    }
  }

  // remove stock from watch list
  handleRemoveFromWatchList(watchListAndSymbolObj) {

    let symbol = watchListAndSymbolObj.symbol.toLowerCase();
    let watchList = watchListAndSymbolObj.watchList;

    /* remove the watch list and its content */
    if (symbol === '') {
      cookie.remove(watchList, { path: '/' });
      console.log("Removed watch list: " + watchList);

      let tempObj = JSON.parse(JSON.stringify(this.state.watchListsArrsObj));
      delete tempObj[watchList];
      let tempArr = JSON.parse(JSON.stringify(this.state.watchListsArr));
      let index = tempArr.indexOf(watchList);
      if (index > -1) {
        tempArr.splice(index, 1);
      }
      // console.log(tempObj);
      // console.log(tempArr);
      this.setState({
        watchListsArrsObj: tempObj,
        watchListsArr: tempArr
      });
      return;
    }

    // console.log("symbol to remove: " + symbol);
    let symbolArr = this.state.watchListsArrsObj[watchList];
    // console.log("symbols in " + watchList + ": " + symbolArr);
    var index = symbolArr.indexOf(symbol);
    if (index > -1) {
      symbolArr.splice(index, 1);
    }
    else {
      console.log(symbol + " is not in " + watchList + "; no need to remove");
    }
    // console.log(symbolArr);
    let symbolString = symbolArr.toString();
    cookie.save(watchList, symbolString, {path: "/"});

    // this.getWatchLists();
    let tempObj = this.state.watchListsArrsObj;
    tempObj[watchList] = symbolArr;
    this.setState({
      watchListsArrsObj: tempObj
    })
  }

  handleSelectedCompany(symbol) {
    this.setState( {symbol: symbol} );

    /* determine whether add-to-watch-list button should appear */
   //  let isInList = false;
   //  for (var key in this.state.watchListsArrsObj) {
   //    // console.log(key, this.state.watchListsArrsObj[key]);
   //    if (this.state.watchListsArrsObj[key].includes(symbol.toUpperCase())) {
   //      isInList = true;
   //      break;
   //    }
   // }
   //
   //  if (isInList) {
   //    // hide the 'add to watchlist' button
   //    this.setState( {toHide: true});
   //    console.log(symbol + " already in list, dont show ADD Button");
   //  }
   //  else {
   //    // reveal the 'add to watchlist' button
   //    this.setState( {toHide: false});
   //    console.log(symbol + " not in list, show ADD Button");
   //  }
  }


  render() {
    // console.log("quote component");
    // console.log("watchListsArrsObj: ");
    // console.log(this.state.watchListsArrsObj);
    // console.log(this.state.newWatchListAndSymbolObj);
    return (
      <div>
        <div className="quoteContainer">
          <h2>Quote</h2>
          <br/>
          <p>Select the stock by typing the company name</p>
          <QuoteSearchBar
            watchListsArr={this.state.watchListsArr}
            symbol={this.handleSelectedCompany}
            toHideButton={this.state.toHide}
            addToList={this.handleAddToWatchlist}
          />
          <hr />
          <WatchListsMainContainer
            watchListsObj={this.state.watchListsArrsObj}
            handleRemove={this.handleRemoveFromWatchList}
            toAdd={this.state.toAdd}
            newWatchListAndSymbolObj={this.state.newWatchListAndSymbolObj}
          />
        </div>
        <QuoteFooter />
      </div>
    );
  }
}

export default Quote;
