import React, { Component } from "react";
import WatchListTabs from "./WatchListTabs";
import SymbolListTabs from "./SymbolListTabs";
import NewsList from "./NewsList";


class NewsContainer extends Component {

  constructor() {
    super();
    this.state = {
      currentWatchList: '',
      currentCompanyNewsObj: {}
    }
    // this.updateCompanyNews = this.updateCompanyNews.bind(this);
    this.handleSelectWatchList = this.handleSelectWatchList.bind(this);
    this.handleSelectCompany = this.handleSelectCompany.bind(this);
    this.getNewsForCompany = this.getNewsForCompany.bind(this);
    this.numNewsArticles = 10;
  }

  // fetch news about selected companies
  getNewsForCompany(symbol) {
    return Promise.resolve(
      fetch("https://finance.yahoo.com/rss/headline?s=" + symbol)
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
          currentCompanyNewsObj: result
        });
      })
    )

    // return Promise.resolve(
    //   // fetch("/api/news/company/" + symbol)
    //   fetch("/api/company/rss/2.0/headline?s=" + symbol)
    //   .then(response => { return response.text() })
    //   .then((xmlText) => {
    //     let temp;
    //     var parseString = xml2js.parseString;
    //     parseString(xmlText, function(err, result) {
    //       result["rss"]["channel"]["description"] = symbol.toUpperCase();
    //       temp = result;
    //     })
    //     return temp;
    //   }).then(result => {
    //     this.setState({
    //       currentCompanyNewsObj: result
    //     });
    //   })
    // )

  }


  // update the most recently viewed watch list
  handleSelectWatchList(watchList) {
    this.setState({
      currentWatchList: watchList
    });
  }

  // get the news for selected company
  handleSelectCompany(symbol) {
    this.getNewsForCompany(symbol);
  }

  render() {
    return (
      <div>
        <WatchListTabs watchListsArr={this.props.watchListsArr} selectWatchList={this.handleSelectWatchList} />
        {this.state.currentWatchList ?
          <SymbolListTabs symbolListArr={this.props.watchListsArrsObj[this.state.currentWatchList]} selectSymbol={this.handleSelectCompany} /> : false
        }
        {this.state.currentCompanyNewsObj ?
          <NewsList newsObj={this.state.currentCompanyNewsObj} sliceLimit={this.numNewsArticles} /> : false
        }
      </div>
    )
  }

}

export default NewsContainer;
