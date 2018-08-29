import React, { Component } from "react";
import NewsResult from "./NewsResult";
import QuoteResult from "./QuoteResult";


class QuoteSearchBar extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      companies: [],
      searchString: '',
      selectedSymbol: '',
      quoteObj: {},
      newsObj: [],
      logoURL: '',

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

    // fetch quote data
    var symbol = symbol.toLowerCase();
    var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/quote";
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState({ quoteObj: data });
    });
    // console.log(data);

    // fetch news about Company
    var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/news/last/2";
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
          { companies.map(company => { return <div key={company.symbol} name={company.symbol} onClick={this.handleClick}>{company.symbol + ": " + company.name} </div> }) }
          <div className="container">
            <QuoteResult quote={this.state.quoteObj} logoURL={this.state.logoURL} />
            <NewsResult newsArray={this.state.newsObj} />
          </div>
        </div>
    );
  }
}

export default QuoteSearchBar;
