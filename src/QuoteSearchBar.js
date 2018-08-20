import React, { Component } from "react";

class QuoteSearchBar extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      searchString: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // sets state, triggers render method
  handleChange(event) {
    // grab value form input box
    this.setState({searchString:event.target.value});
    console.log("detected string change");
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    var companies = this.props.companies;
    var searchString = this.state.searchString.trim().toLowerCase();

    // filter companies list by value from input box
    if(searchString.length > 0){
      companies = companies.filter(function(company){
        return company.name.toLowerCase().match( '^' + searchString );
      });
    }

    if (searchString.length > 0) {
      return (
        <div>
          <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" />
          <ul>
            { companies.map(function(company){ return <li key={company.symbol}>{company.name} </li> }) }
          </ul>
        </div>
      );
    }
    else {
      return (
        <div>
          <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" />
          </div>
      );
    }
  };
}

export default QuoteSearchBar;
