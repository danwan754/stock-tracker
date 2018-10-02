import React, { Component } from "react";
import cookie from "react-cookies";
import xml2js from "xml2js";
import NewsList from "./NewsList";
import NewsModal from "./NewsModal";
import NewsCompanyModal from "./NewsCompanyModal";
import NewsFooter from "./NewsFooter";
import './styles.css';


class News extends Component {

  constructor() {
    super();
    this.state = {
      watchlist: cookie.load('watchlist'), // ex.: "aapl,amz,tsl"
      // companies: cookie.load('companies'), // user saved companies to display news
      // industriesToHide: cookie.load('industriesToHide'), // "true" to display industry news or "false" to hide
      // companiesToHide: cookie.load('companiesToHide'), // "true" to display company news or "false" to hide
      industriesNewsObj: {}, // rss feed containing news from industries of all companies in watch list
      companiesNewsObjArr: [], // list of company news for all user saved companies
      currentCompanyNewsObj: {} // news object of the company that is currently being viewed in Company News section
    }
    this.updateIndustryNews = this.updateIndustryNews.bind(this);
    this.updateCompanyNews = this.updateCompanyNews.bind(this);
    this.maxNumSampleArticles = 3;
    this.maxNumArticles = 20;
  }

  componentDidMount() {
    this.updateIndustryNews();
    this.updateCompanyNews();
  }


  updateIndustryNews() {

    let industriesString;
    if (typeof this.state.watchlist == 'undefined' || this.state.watchlist == '') {
      industriesString = "aapl,cgc,amzn,wmt,gs,wfc";
    }
    else {
      industriesString = this.state.watchlist;
    }
    // let url = "https://finance.yahoo.com/rss/industry?s=" + industriesString;
    // var tempNewsObj = {};
    // fetch(url)
    // .then(response => { console.log(response); return response.text() })
    // .then((xmlText) => {
    //   var parseString = require('xml2js').parseString;
    //   parseString(xmlText, function(err, result) {
    //
    //     // strip out the html tags in description field of each news article
    //     result["rss"]["channel"][0]["item"].map(article => {
    //       var regex = /(?<=<p><a.*<\/a>).*(?=<p><br)/gi;
    //       article["description"] = article["description"][0].match(regex);
    //       tempNewsObj = result;
    //     });
    //   });
    //
    //   this.setState( {industriesNewsObj: tempNewsObj} );
    // });

    var tempNewsObj = {};
    // fetch('/api/news/industry/' + industriesString)
    fetch('/api/rss/industry?s=' + industriesString)
    .then(response => { return response.text() })
    .then((xmlText) => {
      var parseString = require('xml2js').parseString;
      parseString(xmlText, function(err, result) {

        // strip out the html tags in description field of each news article
        result["rss"]["channel"][0]["item"].map(article => {
          var regex = /(?<=<p><a.*<\/a>).*(?=<p><br)/gi;
          article["description"] = article["description"][0].match(regex);
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
      // return Promise.resolve(
      //   fetch("https://finance.yahoo.com/rss/headline?s=" + symbol)
      //   .then(response => { return response.text() })
      //   .then((xmlText) => {
      //     let temp;
      //     var parseString = require('xml2js').parseString;
      //     parseString(xmlText, function(err, result) {
      //       result["rss"]["channel"]["description"] = symbol.toUpperCase();
      //       temp = result;
      //     })
      //     return temp;
      //   })
      // )
      return Promise.resolve(
        // fetch("/api/news/company/" + symbol)
        fetch("/api/rss/headline?s=" + symbol)
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
          companiesNewsObjArr.push(companyObj)
        )})
      )})
      .then(result => { this.setState( {companiesNewsObjArr: companiesNewsObjArr} ) })
  }


  render() {

    return (
      <div>
        <h2>News</h2>
        <br/>
        <div className="outter-div">
          <h3>Suggested News</h3>
          <div className="suggested-news">
            <NewsList newsObj={this.state.industriesNewsObj} sliceLimit={this.maxNumSampleArticles} />
            <NewsModal newsObj={this.state.industriesNewsObj} sliceLimit={this.maxNumArticles} />
          </div>
          <br/>
          <h3>Company News</h3>
          <NewsCompanyModal newsObjArr={this.state.companiesNewsObjArr} sliceLimit={this.maxNumArticles} />
        </div>
        <NewsFooter />
      </div>
    );
  }
}

export default News;
