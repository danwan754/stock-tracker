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
  }

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

  render() {

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
        <input type="submit"/>
        { companies.map(company => { return <div key={company.symbol} name={company.symbol} onClick={this.handleClick}>{company.symbol + ": " + company.name} </div> }) }
        </div>
    );
  }
}

export default QuoteSearchBar;
