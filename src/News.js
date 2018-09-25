import React, { Component } from "react";
import cookie from "react-cookies";
import xml2js from "xml2js";
import NewsList from "./NewsList";
import NewsModal from "./NewsModal";
import './styles.css';


class News extends Component {

  constructor() {
    super();
    this.state = {
      watchlist: cookie.load('watchlist'), // ex.: "aapl,amz,tsl"
      // industries: cookie.load('industries'), // user saved industries to display
      companies: cookie.load('companies'), // user saved companies to display news
      // generalToHide: cookie.load('generalToHide'),
      industriesToHide: cookie.load('industriesToHide'), // "true" to display industry news or "false" to hide
      companiesToHide: cookie.load('companiesToHide'), // "true" to display company news or "false" to hide
      industriesNewsObj: {}, // rss feed containing news from industries of all companies in watch list
      companiesNewsObjArr: [], // list of company news for all user saved companies
      currentCompanyNewsObj: {} // news object of the company that is currently being viewed in Company News section
    }
    this.updateIndustryNews = this.updateIndustryNews.bind(this);
    this.updateCompanyNews = this.updateCompanyNews.bind(this);
    this.handleClickSelectCompany = this.handleClickSelectCompany.bind(this);
  }

  componentDidMount() {
//    updateGeneralNews(); // not supported in Yahoo API (use IEX instead?)
    this.updateIndustryNews();
    // this.updateCompanyNews();
  }

  componentDidUpdate() {
    // keep the selected company div infocus
    if (Object.keys(this.state.currentCompanyNewsObj).length > 0) {
      document.getElementById(this.state.currentCompanyNewsObj.rss.channel.description).style.backgroundColor = "#cccccc";
    }
  }

  updateIndustryNews() {

    let url = "https://finance.yahoo.com/rss/industry?s=" + this.state.watchlist;
    var tempNewsObj = {};
    fetch(url)
    .then(response => { return response.text() })
    .then((xmlText) => {
      // console.log(xmlText);
      var parseString = require('xml2js').parseString;
      parseString(xmlText, function(err, result) {
        // console.log(result["rss"]["channel"][0]["item"]);

        // strip out the html tags in description field of each news article
        result["rss"]["channel"][0]["item"].map(article => {
          // console.log(article["description"]);
          var regex = /(?<=<p><a.*<\/a>).*(?=<p><br)/gi;
          article["description"] = article["description"][0].match(regex);
          // console.log(article["description"]);
          tempNewsObj = result;
        });
      });

      this.setState( {industriesNewsObj: tempNewsObj} );
    });
  }

  updateCompanyNews() {

    // if (typeof this.state.companies === 'undefined' || this.state.companies == '') {
    //   return;
    // }
    // console.log(this.state.companies);
    // var symbolArr = this.state.companies.split(",");
    if (typeof this.state.watchlist === 'undefined' || this.state.watchlist == '') {
      return;
    }
    console.log(this.state.watchlist);
    var symbolArr = this.state.watchlist.split(",");

    // fetch news about selected companies
    function getNewsForCompany(symbol) {
      return Promise.resolve(
        fetch("http://finance.yahoo.com/rss/headline?s=" + symbol)
        .then(response => { return response.text() })
        .then((xmlText) => {
          let temp;
          var parseString = require('xml2js').parseString;
          parseString(xmlText, function(err, result) {
            result["rss"]["channel"]["description"] = symbol.toUpperCase();
            temp = result;
          })
          return temp;
        })
      )
    }

    // fetch all the news articles for every saved company simultaneously
    var companiesNewsObjArr = [];
    Promise.all(symbolArr.map(symbol =>
      getNewsForCompany(symbol)
    ))
      .then(result => { return (
        result.map(companyObj => { return (
        // console.log(companyObj)
        companiesNewsObjArr.push(companyObj)
        )})
      )})
      .then(result => { this.setState( {companiesNewsObjArr: companiesNewsObjArr} ) })
  }

  // select company to view news
  handleClickSelectCompany(event) {

    let company = event.target.id;

    // remove the highlighting of current company
    if (Object.keys(this.state.currentCompanyNewsObj).length > 0) {
      document.getElementById(this.state.currentCompanyNewsObj.rss.channel.description).style.backgroundColor = "";
    }

    this.state.companiesNewsObjArr.map(newsObj => {
      // console.log("newsoBj: " + newsObj.rss.channel.description);
      if (newsObj.rss.channel.description == company) {
        this.setState( {currentCompanyNewsObj: newsObj} );
        return;
      }
    })
  }

  // toggles hiding of section of news (general, industries, companies)
  handleHideClick() {
    return;
  }

  render() {
    // console.log(this.state.industriesNewsObj)
    // console.log(this.state.companiesNewsObjArr);
    // this.state.watchlist.split(",").map(symbol => console.log(symbol))
    // console.log(this.state.currentCompanyNewsObj);

    return (
      <div>
        <h2>News</h2>
        <br/>
        <h3>Suggested News</h3>
        <NewsList newsObj={this.state.industriesNewsObj} />
        <NewsModal newsObj={this.state.industriesNewsObj} />
        <br/>
        <h3>Company News</h3>
        <div className="inline" id="companyNewsBar">
          <h5>Watch List</h5>
          {this.state.watchlist.split(",").map(symbol => { symbol = symbol.toUpperCase(); return (
            <div className="suggestion" key={symbol} id={symbol} onClick={this.handleClickSelectCompany}>
              {symbol}
            </div>
          )})}
        </div>
        <div className="inline" id="companyNewsList">
          <NewsList newsObj={this.state.currentCompanyNewsObj} />
        </div>
      </div>
    );
  }
}

export default News;
