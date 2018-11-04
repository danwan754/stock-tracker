import React, { Component } from "react";
import '/styles.css';
import Button from "react-bootstrap/lib/Button";
import WatchListsRowContainer from "./WatchListsRowContainer";

class WatchListsMainContainer extends Component {

  constructor() {
    super();
    this.state = {
      batchObj: {} // object of all watch lists quotes; ex.: { }
    }
    this.watchListsRows = this.watchListsRows.bind(this);
    this.compareObjects = this.compareObjects.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.watchListsObj);
    this.fetchWatchListQuotes(this.props.watchListsObj);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //
  //   // console.log(this.props.watchListsObj);
  //   // console.log(nextProps.watchListsObj);
  //   if (this.compareObjects(this.props.watchListsObj, nextProps.watchListsObj)) {
  //     console.log("props are the same, dont render");
  //     return false;
  //   }
  //   // if (nextProps.newWatchListAndSymbolObj.watchList === this.props.newWatchListAndSymbolObj.watchList
  //   //       && nextProps.newWatchListAndSymbolObj.symbol === this.props.newWatchListAndSymbolObj.symbol) {
  //   //   console.log("props are same; dont render");
  //   //   return false;
  //   // }
  //   console.log("rendering");
  //   return true;
  // }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps");
    // console.log(this.props.watchListsObj);
    // console.log(nextProps.watchListsObj);
    // console.log(this.props);
    // console.log(prevState);
    // console.log(this.state);

    // // console.log(prevProps.watchListsObj);
    // if (this.compareObjects(this.props.watchListsObj, nextProps.watchListsObj)) {
    //   console.log("dont render");
    //   return;
    // }

    // if (this.props.watchListsObj === nextProps.watchListsObj) {
    //   console.log("dont render");
    //   return;
    // }

    // console.log("rendering");
    // console.log(nextProps.watchListsObj);
    this.fetchWatchListQuotes(nextProps.watchListsObj);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("componentDidUpdate");
  //   console.log(this.props.watchListsObj);
  //   console.log(prevProps.watchListsObj);
  //   // console.log(this.props);
  //   // console.log(prevState);
  //   // console.log(this.state);
  //
  //   // console.log(prevProps.watchListsObj);
  //   if (this.compareObjects(this.props.watchListsObj, prevProps.watchListsObj)) {
  //     console.log("dont render");
  //     return;
  //   }
  //
  //   console.log("rendering");
  //   this.fetchWatchListQuotes(this.props.watchListsObj);
  // }

  // check if the two objects containing watch lists are the same
  compareObjects(objA, objB) {

    // console.log(Object.keys(objA).length);
    // console.log(Object.keys(objB).length);

    var i; // for loop iterator

    // compare the number of keys in each object
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      console.log("objA and objB have different size");
      return false;
    }

    // compare the keys (name of watch lists) of each object, return true if they are equivalent
    let arrA = Object.keys(objA);
    let arrB = Object.keys(objB);
    for (i=0; i<arrA.length; i++) {
      if (!arrB.includes(arrA[i])) {
        console.log("objA and objB have different keys");
        return false;
      }
    }

    // compare the lengths of the same watch lists in each object
    for (i=0; i<arrA.length; i++) {
      if (objA[arrA[i]].length !== objB[arrA[i]].length) {
        console.log("objA and objB has a watch list that has different size");
        return false;
      }
    }

    // compare all the symbols in the same watch lists in each object
    for (i=0; i<arrA.length; i++) {
      for (var j=0; j<objA[arrA[i]].length; j++) {
        // console.log(objB[arrA[i]]);
        // console.log(objA[arrA[i]][j]);
        if (!objB[arrA[i]].includes(objA[arrA[i]][j])) {
          console.log("objA and objB symbols that are different");
          return false;
        }
      }
    }

    console.log("objA and objB are the SAME");
    return true;
  }


  fetchWatchListQuotes(watchListsObj) {

    if (Object.keys(watchListsObj).length === 0) {
      this.setState({
        batchObj: {}
      });
      return;
    }
    // console.log("watchListsObj in watchListsMainContainer: ");
    // console.log(watchListsObj);

    // fetch quotes for a watch List
    // param: watchListArr: array of company ticker symbols
    function getWatchListQuotes(watchListArr) {
      // console.log("https://api.iextrading.com/1.0/stock/market/batch?symbols=" + watchListArr.join(",") + "&types=quote");
      return Promise.resolve(
        // get the batch quote for whole watch list
        fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols=" + watchListArr.join(",") + "&types=quote")
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
    // console.log("notempty: " + notEmptyLists);
    // console.log("empty: " + emptyLists);

    Promise.all(notEmptyLists.map(watchList => {
      // console.log("key: " + watchList);
      // console.log(watchListsObj[watchList]);
      return getWatchListQuotes(watchListsObj[watchList])
    })).then(result => {

        // append the watch list quotes
        for (var i=0; i<result.length; i++) {
          batchQuoteObj[notEmptyLists[i]] = result[i];
        }

        // append the empty watch lists
        for (i=0; i<emptyLists.length; i++) {
          // console.log(emptyLists[i]);
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
      // console.log("tempObj: ");
      // console.log(tempObj);
      count++;
      if (count === 3 || i === batchObjLength-1) {
        watchListArr.push(<WatchListsRowContainer key={i} batchObj={tempObj} handleRemove={this.props.handleRemove} />);
        tempObj = {};
        count = 0;
      }
    }
    // console.log(watchListArr[0]);
    return watchListArr;
  }

  render() {
    // console.log("watchListsMainContainer component");
    // console.log("batchObj: ");
    // console.log(this.state.batchObj);
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
