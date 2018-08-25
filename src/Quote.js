import React, { Component } from "react";
import QuoteSearchBar from "./QuoteSearchBar";
import QuoteResult from "./QuoteResult";
import NewsResult from "./NewsResult";
import WatchLists from "./WatchLists";

class Quote extends Component {

  constructor() {
    super();
    this.state = {
      companies: [],
      quoteObj: {},
      newsObj: [],
      logoURL: '',
      toAdd: false,
      symbol: ''
    }
    this.handleSelectedCompany = this.handleSelectedCompany.bind(this);
    this.handleToAdd = this.handleToAdd.bind(this);
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
    var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/news/last/4";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ newsObj: data })
    });

    // fetch company logo
    var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/logo";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ logoURL: data.url })
    });

    this.setState({symbol: symbol});
    this.setState({toAdd: false});
  }

  handleToAdd(toAdd) {
    this.setState({toAdd: toAdd});
  }


  render() {
    // console.log("quote")
    // console.log(this.state.toAdd);
    return (
      <div>
        <h2>Quote</h2>
        <p>Select the stock by inputting the stock ticker symbol,
        or type in company name</p>
        <QuoteSearchBar companies={this.state.companies} symbol={this.handleSelectedCompany} toAdd={this.handleToAdd} />
        <QuoteResult quote={this.state.quoteObj} logoURL={this.state.logoURL} />
        <NewsResult newsArray={this.state.newsObj} />
        <br />
        <WatchLists symbol={this.state.symbol} toAdd={this.state.toAdd}/>
      </div>
    );
  }
}

export default Quote;
