import React, { Component } from "react";
import NewsResult from "./NewsResult";
import QuoteResult from "./QuoteResult";
import QuoteGraph from "./QuoteGraph";
import QuoteFooter from "./QuoteFooter";

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class QuoteResultModal extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      selectedSymbol: '',
      quoteObj: {},
      graphObj: [],
      // newsObj: [], // for IEX news
      newsObj: {}, // for Yahoo news
      logoURL: '',
      period: ''
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleClick(event) {
    let symbol = event.target.textContent.match(".*:")[0].trim().replace(":", '').toLowerCase();

    var baseUrl = "https://api.iextrading.com/1.0/stock/" + symbol;

    // fetch quote data
    function getQuote() {
      var url =  baseUrl + "/quote";
      return fetch(url)
        .then(response => { return response.json() })
    }

    // fetch news about Company
    function getNews() {
      var url = baseUrl + "/news/last/2";
      return fetch(url)
        .then(response => { return response.json() })
    }

    // fetch company logo and return url
    function getLogo() {
      var url = baseUrl + "/logo";
      return fetch(url)
        .then(response => { return response.json() })
        .then(data => { return data["url"] });
    }

    // fetch graph data (default range is intraday data (minute by minute))
    // default period of 1 month
    function getChart() {
      var url = baseUrl + "/chart/1m";
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
                        period: '1m'
        });
      });
  }


  handleShow(event) {
    event.target.blur();
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div className="suggestion" name={this.props.company.symbol} onClick={this.handleClick}>{this.props.company.symbol + ": " + this.props.company.name} </div>
      <ButtonToolbar>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Suggested News
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="inline quote">
              <QuoteResult symbol={this.props.selectedSymbol} quoteObj={this.props.quoteObj} logoURL={this.props.logoURL} />
            </div>
            <div className="inline news">
              <NewsResult symbol={this.props.selectedSymbol} newsArray={this.props.newsObj} />
            </div>
            <QuoteGraph graphObj={this.props.graphObj} symbol={this.props.selectedSymbol} period={this.props.period}/>
          </Modal.Body>
          <Modal.Footer>
            <QuoteFooter />
          </Modal.Footer>
        </Modal>
      </ ButtonToolbar>
    )
  }
}

export default QuoteResultModal;
