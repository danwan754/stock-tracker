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

  /* development */
  // fetch news about selected companies from Yahoo! Finance RSS
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

    /* production */
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
    // console.log(this.props.watchListsArrsObj);
    // console.log(this.props.watchListsArrsObj[this.state.currentWatchList].length);
    return (
      <div>
        {this.props.watchListsArrsObj ?
          <WatchListTabs watchListsArr={this.props.watchListsArr} selectWatchList={this.handleSelectWatchList} />
          : <p>Create a watch list and add stocks to it to view news.</p>
        }
        {this.state.currentWatchList ?
          this.props.watchListsArrsObj[this.state.currentWatchList].length > 0 ?
            <SymbolListTabs symbolListArr={this.props.watchListsArrsObj[this.state.currentWatchList]} selectSymbol={this.handleSelectCompany} />
            : <p>This watch list is empty.</p>
          : ''
        }
        {this.state.currentCompanyNewsObj ?
          <NewsList newsObj={this.state.currentCompanyNewsObj} sliceLimit={this.numNewsArticles} /> : false
        }
      </div>
    )
  }

}

export default NewsContainer;
