import React, { Component } from "react";
import './watch-list-styles.css';
import Button from "react-bootstrap/lib/Button";
import WatchListsRowContainer from "./WatchListsRowContainer";

class WatchListsMainContainer extends Component {

  constructor() {
    super();
    this.state = {
      batchObj: {} // object of all watch lists quotes; ex.: { }
    }
    this.watchListsRows = this.watchListsRows.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.watchListsObj);
    this.fetchWatchListQuotes(this.props.watchListsObj);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchWatchListQuotes(nextProps.watchListsObj);
  }

  fetchWatchListQuotes(watchListsObj) {

    if (Object.keys(watchListsObj).length === 0) {
      this.setState({
        batchObj: {}
      });
      return;
    }

    // fetch quotes for a watch List
    // param: watchListArr: array of company ticker symbols
    function getWatchListQuotes(watchListArr) {
      var url = "/api/quote/batch?symbols=" + watchListArr.join(",");
      return Promise.resolve(
        fetch(url)
        .then(response => { return response.json() })
      )
    }

    var batchQuoteObj = {};
    var notEmptyLists = [];
    var emptyLists = []; // watch lists that are empty
    Object.keys(watchListsObj).map((watchList) => {
      if (watchListsObj[watchList].length > 0) {
        // console.log(watchListsObj[watchList]);
        if (watchListsObj[watchList][0] === '') {
          emptyLists.push(watchList);
        }
        else {
          notEmptyLists.push(watchList);
        }
      }
      else {
        emptyLists.push(watchList);
      }
      return 0;
    })

    Promise.all(notEmptyLists.map(watchList => {
      return getWatchListQuotes(watchListsObj[watchList])
    })).then(result => {

        // append the watch list quotes
        for (var i=0; i<result.length; i++) {
          batchQuoteObj[notEmptyLists[i]] = result[i];
        }

        // append the empty watch lists
        for (i=0; i<emptyLists.length; i++) {
          batchQuoteObj[emptyLists[i]] = {};
        }
      return 0;
    }).then(result => { this.setState( {batchObj: batchQuoteObj }) })
  }


  handleRefresh(event) {
    event.target.blur(); // get rid of focus on button
    this.fetchWatchListQuotes(this.props.watchListsObj);
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
      count++;
      if (count === 3 || i === batchObjLength-1) {
        watchListArr.push(<WatchListsRowContainer key={i} batchObj={tempObj} handleRemove={this.props.handleRemove} />);
        tempObj = {};
        count = 0;
      }
    }
    return watchListArr;
  }

  render() {
    if (Object.keys(this.state.batchObj).length > 0) {
      return (
        <div className="watchListsMainContainer">
          <h3 id="inline">Watch Lists</h3>
          <Button id="refreshButton" onClick={this.handleRefresh}><i className="fa refresh-icon">&#xf021;</i></Button>
          <div>
            {this.watchListsRows().map((watchListObj, i) => {return <div key={i}>{watchListObj}</div> })}
          </div>
        </div>
      )
    }
    else {
      return (<div></div>)
    }
  }
}

export default WatchListsMainContainer;
