import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";
import WatchListsMainContainer from "./watchList/WatchListsMainContainer";
import QuoteFooter from "./QuoteFooter";
import cookie from "react-cookies";
import './quote-styles.css'


class Quote extends Component {

  constructor() {
    super();
    this.state = {
      symbol: '',
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
      let watchListString = watchListsObj[watchList];
      watchListsArrsObj[watchList] = watchListString.split(",");
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
        symbolArr.push(symbol);
        symbolString = symbolArr.toString();
      }
      cookie.save(watchList, symbolString, {path: "/"});
      let tempObj = JSON.parse(JSON.stringify(this.state.watchListsArrsObj));
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
      let tempObj = JSON.parse(JSON.stringify(this.state.watchListsArrsObj));
      delete tempObj[watchList];
      let tempArr = JSON.parse(JSON.stringify(this.state.watchListsArr));
      let index = tempArr.indexOf(watchList);
      if (index > -1) {
        tempArr.splice(index, 1);
      }
      this.setState({
        watchListsArrsObj: tempObj,
        watchListsArr: tempArr
      });
      return;
    }

    let symbolArr = this.state.watchListsArrsObj[watchList];
    var index = symbolArr.indexOf(symbol);
    if (index > -1) {
      symbolArr.splice(index, 1);
    }

    let symbolString = symbolArr.toString();
    cookie.save(watchList, symbolString, {path: "/"});

    let tempObj = this.state.watchListsArrsObj;
    tempObj[watchList] = symbolArr;
    this.setState({
      watchListsArrsObj: tempObj
    })
  }

  handleSelectedCompany(symbol) {
    this.setState( {symbol: symbol} );
  }


  render() {
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
