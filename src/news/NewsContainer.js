import React, { Component } from "react";
import WatchListTabs from "./WatchListTabs";
import SymbolListTabs from "./SymbolListTabs";
import NewsList from "./NewsList";


class NewsContainer extends Component {

  constructor() {
    super();
    this.state = {
      currentWatchList: '',
      currentCompanyNewsObj: {},
      toShow: false
    }
    this.handleSelectWatchList = this.handleSelectWatchList.bind(this);
    this.handleSelectCompany = this.handleSelectCompany.bind(this);
    this.getNewsForCompany = this.getNewsForCompany.bind(this);
    this.numNewsArticles = 10;
  }

  /* fetch news about selected companies from Yahoo! Finance RSS */
  getNewsForCompany(symbol) {

    var url = "/api/news/company?symbol=" + symbol;
    fetch(url)
    // fetch("/api/company/rss/2.0/headline?s=" + symbol)
    .then(response => { return response.text() })
    .then((xmlText) => {
      let temp;
      var parseString = require('xml2js').parseString;
      parseString(xmlText, function(err, result) {
        result["rss"]["channel"]["description"] = symbol.toUpperCase();
        temp = result;
      })
      return temp;
    }).then(result => {
      this.setState({
        currentCompanyNewsObj: result,
        toShow: false
      });
    })
  }


  // update the most recently viewed watch list
  handleSelectWatchList(watchList) {

    // switching to a different watch list will clear the currently displayed news
    let toShow = true;
    if (watchList === this.state.currentWatchList) {
      toShow = false;
    }

    this.setState({
      currentWatchList: watchList,
      toShow: toShow
    });
  }

  // get the news for selected company
  handleSelectCompany(symbol) {
    this.getNewsForCompany(symbol);
  }

  render() {
    // console.log("newscontainer");
    // console.log(this.props.watchListsArrsObj);

    return (
      <div>
        {this.props.watchListsArr.length > 0 ?
          <WatchListTabs watchListsArr={this.props.watchListsArr} selectWatchList={this.handleSelectWatchList} />
          : <p>Create a watch list and add stocks to it to view stock headlines. Begin by quoting for stocks and adding them to a new watch list.</p>
        }
        {this.state.currentWatchList ?
          this.props.watchListsArrsObj[this.state.currentWatchList].length > 0 ?
            <SymbolListTabs symbolListArr={this.props.watchListsArrsObj[this.state.currentWatchList]} selectSymbol={this.handleSelectCompany} />
            : <p>This watch list is empty.</p>
          : ''
        }
        {!this.state.toShow ?
          this.state.currentCompanyNewsObj ?
            <NewsList newsObj={this.state.currentCompanyNewsObj} sliceLimit={this.numNewsArticles} />
            : ''
          : ''
        }
      </div>
    )
  }

}

export default NewsContainer;
