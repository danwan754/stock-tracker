import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";
import QuoteResult from "./QuoteResult";

class Quote extends Component {

  constructor() {
    super();
    this.state = {
      companies: [],
      selectedCompany: '',
      quoteObj: {}
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
    // this.setState({selectedCompany: symbol});
    // // console.log(symbol);
    var symbol = symbol.toLowerCase();
    var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/quote"
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ quoteObj: data });
    });
      // console.log(data);
  }


  render() {
    return (
      <div>
        <h2>Quote</h2>
        <p>Select the stock by inputting the stock ticker symbol,
        or type in company name</p>
        <QuoteSearchBar companies={this.state.companies} symbol={this.handleSelectedCompany} />
        <QuoteResult quote={this.state.quoteObj}/>
      </div>
    );
  }
}

export default Quote;
