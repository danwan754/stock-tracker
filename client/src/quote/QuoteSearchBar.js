import React, { Component } from "react";
import NewsResult from "./NewsResult";
import QuoteResult from "./QuoteResult";
import QuoteGraph from "./QuoteGraph";
import QuoteFooter from "./QuoteFooter";
import WatchListDropDown from "./WatchListDropDown";

import Modal from 'react-bootstrap/lib/Modal';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class QuoteSearchBar extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      show: false,
      companies: [],
      searchString: '',
      selectedSymbol: '',
      quoteObj: {},
      graphObj: [],
      newsObj: {}, // for Yahoo news
      logoURL: '',
      period: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.watchListAndSymbol = this.watchListAndSymbol.bind(this);
  }

  componentDidMount() {

    // get all the company names listed on IEX
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
    .then(response => { return response.json() })
    .then(data => { this.setState({ companies: data });
    })
  }

  handleClick(event) {
    let symbol = event.target.textContent.match(".*:")[0].trim().replace(":", '').toLowerCase();

    // fetch quote data
    function getQuote() {
      var url = "/api/quote?symbol=" + symbol;
      return fetch(url)
        .then(response => { return response.json() })
    }

    // fetch news about Company
    function getNews() {
      var url = "/api/news/analysis?symbol=" + symbol;
      return fetch(url)
        .then(response => { return response.json() })
    }

    // fetch company logo and return url
    function getLogo() {
      var url = "/api/logo?symbol=" + symbol;
      return fetch(url)
        .then(response => { return response.json() })
        .then(data => { return data["url"] });
    }

    // fetch historic stock price data for chart
    function getChart() {
      var defaultPeriod = '1m';
      var url = "/api/chart?period=" + defaultPeriod + "&symbol=" + symbol;
      return fetch(url)
        .then(response => { return response.json() })
    }

    // get results of all the API calls
    function getQuoteNewsLogoAndChart() {
      return Promise.all([getQuote(), getNews(), getLogo(), getChart()]);
    }

    // return symbol to Quote component
    this.props.symbol(symbol);

    // updates all the states
    getQuoteNewsLogoAndChart()
      .then(([quoteObj, newsObj, logoURL, graphObj]) => {
        this.setState({ searchString: '',
                        selectedSymbol: symbol,
                        quoteObj: quoteObj,
                        newsObj: newsObj,
                        logoURL: logoURL,
                        graphObj: graphObj,
                        period: '1m',
                        show: true
        });
      });
  }

  handleChange(event) {

    // need to check for special regex characters and remove them from input string
    var currentString = event.target.value;
    var illegalChars = "[]\\^$.|?*+()";
    if (illegalChars.includes(currentString[currentString.length - 1])) {
      this.setState({searchString: currentString.slice(0, currentString.length - 1)})
    }
    else {
      // grab value form input box
      this.setState({searchString:event.target.value});
    }
  }

  handleHide() {
    this.setState({ show: false });
  }

  // append the watch list and symbol as an object and return it to parent component to add to watch list
  watchListAndSymbol(watchList) {
    let watchListAndSymbolObj = {
      watchList: watchList,
      symbol: this.state.selectedSymbol
    }
    this.props.addToList(watchListAndSymbolObj);
  }

  render() {
    var companies = this.state.companies;
    var searchString = this.state.searchString.trim().toLowerCase();

    // filter companies list by value from input box
    if(searchString.length > 0){
      companies = companies.filter(function(company){
        return company.name.toLowerCase().match(searchString);
      });
      companies = companies.slice(0,10);
    }
    else {
      companies = [];
    }

    return (
        <div>
          <input type="text" name="company" className="submitAdd" value={this.state.searchString} onChange={this.handleChange} placeholder="Company name"/>
          { companies.map(company => {
            return (
              <div className="suggestion" key={company.symbol} name={company.symbol} onClick={this.handleClick}>
                {company.symbol + ": " + company.name}
              </div>
            )
          })}

          <ButtonToolbar>
            <Modal
              show={this.state.show}
              onHide={this.handleHide}
              dialogClassName="modal-quote-results"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">
                  Quote Results
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <WatchListDropDown watchListsArr={this.props.watchListsArr} watchList={this.watchListAndSymbol} toHideButton={this.props.toHideButton} />
                <div>
                  <QuoteResult symbol={this.state.selectedSymbol} quoteObj={this.state.quoteObj} logoURL={this.state.logoURL} />
                  <NewsResult symbol={this.state.selectedSymbol} newsArray={this.state.newsObj} />
                </div>
                <QuoteGraph graphObj={this.state.graphObj} symbol={this.state.selectedSymbol} period={this.state.period}/>
              </Modal.Body>
              <Modal.Footer>
                <QuoteFooter />
              </Modal.Footer>
            </Modal>
          </ ButtonToolbar>
        </div>
    );
  }
}

export default QuoteSearchBar;
