import React, { Component } from "react";
import NewsResult from "./NewsResult";
import QuoteResult from "./QuoteResult";
import QuoteGraph from "./QuoteGraph";
import xml2js from "xml2js";


class QuoteSearchBar extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      companies: [],
      searchString: '',
      selectedSymbol: '',
      quoteObj: {},
      graphObj: [],
      // newsObj: [], // for IEX news
      newsObj: {}, // for Yahoo news
      logoURL: '',
      period: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    // get all the companies listed on IEX
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
    .then(response => { return response.json() })
    .then(data => { this.setState({ companies: data });
      // console.log("company 1: " + this.state.companies[1].symbol);

    })
  }

  handleClick(event) {
    var symbol = event.target.textContent.match(".*:")[0].trim().replace(":", '');

    // clear the search string and store the ticker symbol of the selected company
    this.setState({ searchString: '',
                    selectedSymbol: symbol});
    this.props.symbol(symbol);

    var baseUrl = "https://api.iextrading.com/1.0/stock/" + symbol;

    // fetch quote data
    var symbol = symbol.toLowerCase();
    var url =  baseUrl + "/quote";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ quoteObj: data });
    });
    // console.log(data);

    // fetch news about Company
    var tempNewsObj = {};
    var url = "http://finance.yahoo.com/rss/headline?s=" + symbol;
    fetch(url)
    .then(response => { return response.text() })
    .then((xmlText) => {
      // console.log(xmlText);
      var parseString = require('xml2js').parseString;
      parseString(xmlText, function(err, result) {
        tempNewsObj = result;
      });

      this.setState( {newsObj: tempNewsObj});
    })


    // var url = baseUrl + "/news/last/2";
    // fetch(url)
    // .then(response => { return response.json() })
    // .then(data => { this.setState({ newsObj: data })
    // });

    // fetch company logo
    var url = baseUrl + "/logo";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ logoURL: data.url })
    });

    // fetch graph data (default range is intraday data (minute by minute))
    /*testing with range of 1 month */
    var url = baseUrl + "/chart/1m";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ graphObj: data,
                                    period: "1m" });
    });

    this.setState({selectedSymbol: symbol});
    this.props.symbol(symbol);
  }

  handleChange(event) {

    // need to check for special regex characters and remove them from input string
    var currentString = event.target.value;
    var illegalChars = "\[\]\\\^\$\.\|\?\*\+\(\)";
    if (illegalChars.includes(currentString[currentString.length - 1])) {
      this.setState({searchString: currentString.slice(0, currentString.length - 1)})
    }
    else {
      // grab value form input box
      this.setState({searchString:event.target.value});
    }
  }


  render() {

    // console.log("quotesearchbar");
    // console.log("newsObj:");
    // console.log(this.state.newsObj);

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
          <input type="text" name="company" className="submitAdd" value={this.state.searchString} onChange={this.handleChange} placeholder="Company name or ticker symbol"/>
          { companies.map(company => { return <div className="suggestion" key={company.symbol} name={company.symbol} onClick={this.handleClick}>{company.symbol + ": " + company.name} </div> }) }
          <div className="inline quote">
            <QuoteResult quote={this.state.quoteObj} logoURL={this.state.logoURL} />
          </div>
          <div className="inline news">
            <NewsResult newsObj={this.state.newsObj} />
          </div>
          <QuoteGraph graphData={this.state.graphObj} period={this.state.period}/>
        </div>
    );
  }
}

export default QuoteSearchBar;
