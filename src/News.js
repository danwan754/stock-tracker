import React, { Component } from "react";
import cookie from "react-cookies";
import xml2js from "xml2js";
import NewsList from "./NewsList"
import './styles.css'


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
      companiesNewsObjArr: [] // list of company news for all user saved companies
    }
    this.updateIndustryNews = this.updateIndustryNews.bind(this);
    this.updateCompanyNews = this.updateCompanyNews.bind(this);
  }

  componentDidMount() {
//    updateGeneralNews(); // not supported in Yahoo API (use IEX instead?)
    // this.updateIndustryNews();
    this.updateCompanyNews();
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
        tempNewsObj = result;
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
            temp = result;
          })
          return temp;
        })
      )
    }

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

  fetchCompanyNews(symbol) {
    return;
  }

  // toggles hiding of section of news (general, industries, companies)
  handleHideClick() {
    return;
  }

  render() {
    // console.log(this.state.industriesNewsObj)
    // console.log(this.state.companiesNewsObjArr);

    return (
      <div>
        <h2>News</h2>
        <br/>
        <h3>Industry News</h3>
        <NewsList newsObj={this.state.industriesNewsObj} />
        <br/>
        <h3>Company News</h3>
        {this.state.companiesNewsObjArr.map(companyNewsObj => {
          return (
            <div key={companyNewsObj.rss.channel["0"].description}>
              <NewsList newsObj={companyNewsObj} />
            </div>
          )
        })}
      </div>
    );
  }
}

export default News;
