import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";
import QuoteResult from "./QuoteResult";
import NewsResult from "./NewsResult";

class Quote extends Component {

  constructor() {
    super();
    this.state = {
      companies: [],
      quoteObj: {},
      newsObj: []
    }
    this.handleSelectedCompany = this.handleSelectedCompany.bind(this);
  }

  componentDidMount() {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
    .then(response => { return response.json() })
    .then(data => { this.setState({ companies: data });
      // console.log("company 1: " + this.state.companies[1].symbol);
    })
  }

  handleSelectedCompany(symbol) {

    // fetch quote data
    var symbol = symbol.toLowerCase();
    var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/quote";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ quoteObj: data });
    });
    // console.log(data);

    // fetch news about Company
    var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/news/last/10";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ newsObj: data })
    });
  }


  render() {
    return (
      <div>
        <h2>Quote</h2>
        <p>Select the stock by inputting the stock ticker symbol,
        or type in company name</p>
        <QuoteSearchBar companies={this.state.companies} symbol={this.handleSelectedCompany} />
        <QuoteResult quote={this.state.quoteObj} />
        <NewsResult newsArray={this.state.newsObj} />
      </div>
    );
  }
}

export default Quote;
