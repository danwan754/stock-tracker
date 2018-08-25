import React, { Component } from "react";

class QuoteSearchBar extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      searchString: '',
      selectedCompany: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   // get list of all companies listed on IEX
  //   fetch("https://api.iextrading.com/1.0/ref-data/symbols")
  //   .then(response => { return response.json() })
  //   .then(data => { this.setState({ companies: data }) });
  //     // console.log("company 1: " + this.state.companies[1].symbol);
  // }

  handleChange(event) {
    // grab value form input box
    this.setState({searchString:event.target.value});
  }

  handleClick(event) {
    var symbol = event.target.textContent.match(".*:")[0].trim().replace(":", '');

    // clear the search string and store the ticker symbol of the selected company
    this.setState({ searchString: '',
                    selectedCompany: symbol});
    this.props.symbol(symbol);
    // console.log(this.state.selectedCompany);
  }

  // pass stock to watchlist
  handleSubmit() {
    // this.props.symbol(this.state.selectedCompany);
    this.props.toAdd(true);
  }

  render() {

    // console.log("quotesearchbar");

    var companies = this.props.companies;
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
        <input type="text" name="company" value={this.state.searchString} onChange={this.handleChange} placeholder="Company name or ticker symbol"/>
        <input type="submit" value="Add to watch list" onClick={this.handleSubmit}/>
        { companies.map(company => { return <div key={company.symbol} name={company.symbol} onClick={this.handleClick}>{company.symbol + ": " + company.name} </div> }) }
        </div>
    );
  }
}

export default QuoteSearchBar;
