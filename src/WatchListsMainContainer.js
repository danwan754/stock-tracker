import React, { Component } from "react";
import './styles.css';
import Button from "react-bootstrap/lib/Button";
import WatchListsRowContainer from "./WatchListsRowContainer";




class WatchListsMainContainer extends Component {

  constructor() {
    super();
    this.state = {
      batchObj: {} // object of all watch lists quotes; ex.: { }
    }
    this.watchListsRows = this.watchListsRows.bind(this);
  }

  componentDidMount() {
    this.fetchWatchListQuotes(this.props.watchListsArrsObj);
  }

  componentDidUpdate(prevProps) {
    this.fetchWatchListQuotes(this.props.watchListsArrsObj);
  }

  fetchWatchListQuotes(watchListsArrsObj) {

    if (!watchListsArrsObj) {
      return;
    }
    // fetch quotes for a watch List
    // param: watchListArr: array of company ticker symbols
    function getWatchListQuotes(watchListArr) {
      // var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + watchListArr.join(",") + "&types=quote";
      // console.log(url);
      return Promise.resolve(
        // get the batch quote for whole watch list
        fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols=" + watchListArr.join(",") + "&types=quote")
        .then(response => { return response.json() })
      )
    }

    var batchQuoteObj = {};
    Promise.all(Object.keys(watchListsArrsObj).map(key =>
      // console.log("key:" + key);
      // console.log(watchListsArrsObj[key]);
      getWatchListQuotes(watchListsArrsObj[key])
    )).then(result => {
        // console.log(result);
        for (var i=0; i<result.length; i++) {
          // console.log(result[i]);
          batchQuoteObj[Object.keys(watchListsArrsObj)[i]] = result[i];
        }
      return
    }).then(result => this.setState( {batchObj: batchQuoteObj }))
  }

  // returns an array of objects containing 3 watchlists each
  watchListsRows() {
    let tempObj = {};
    let count = 0;
    let watchListName;
    let watchListArr = [];
    let batchObjLength = Object.keys(this.state.batchObj).length;

    for (var i=0; i<batchObjLength; i++) {
      watchListName = Object.keys(this.state.batchObj)[i];
      tempObj[watchListName] = this.state.batchObj[watchListName];
      console.log(tempObj);
      count++;
      if (count === 3 || i === batchObjLength-1) {
        watchListArr.append(<WatchListsRowContainer key={i} batchObj={tempObj} handleRemove={this.props.handleRemove} />);
        tempObj = {};
        count = 0;
      }
    }
    return watchListArr;
  }

  render() {
    return (
      <div className="watchListContainer">
        <h3 id="inline">Watch List</h3>
        <Button id="refreshButton" onClick={this.handleRefresh}><i className="fa refresh-icon">&#xf021;</i></Button>
        {this.watchListsRows().map((rowObj) => {
          return rowObj
        })}
      </div>
    )
  }
}

export default WatchListsMainContainer;
