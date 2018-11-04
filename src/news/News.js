import React, { Component } from "react";
import cookie from "react-cookies";
import NewsContainer from "./NewsContainer";
import NewsFooter from "./NewsFooter";
import './news-styles.css';


class News extends Component {

  constructor() {
    super();
    this.state = {
      watchListsArrsObj: {}, // ex.: {technology list: ["aapl", "amz"], weed: ["cgc", "tlry"]}
      watchListsArr: [], // ex.: ["technology list", "weed"]
    }
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

      // console.log("watchListsArrsObj[watchList]:");
      // console.log(watchListsArrsObj[watchList]);
      // if the watch list contains empty string, then assign it as an empty list
      if (watchListsArrsObj[watchList][0] === '') {
        watchListsArrsObj[watchList] = [];
        // console.log("remove ''");
        // console.log(watchListsArrsObj);
      }
    }

    this.setState( {watchListsArrsObj: watchListsArrsObj,
                    watchListsArr: Object.keys(watchListsObj)} );
  }

  render() {
    // console.log("News component");
    // console.log(this.state.watchListsArr);
    // console.log(this.state.watchListsArrsObj);

    return (
      <div className="newsContainer">
        <div className="newsContainerWrapper">
          <h2>News</h2>
          <br/>
          <NewsContainer watchListsArr={this.state.watchListsArr} watchListsArrsObj={this.state.watchListsArrsObj} />
        </div>
        <NewsFooter />
      </div>
    );
  }
}

export default News;


// <NewsList newsObj={this.state.industriesNewsObj} sliceLimit={this.maxNumSampleArticles} />
