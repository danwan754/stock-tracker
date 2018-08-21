import React, { Component } from "react";

class QuoteSearchBar extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      searchString: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // sets state, triggers render method
  handleChange(event) {
    // grab value form input box
    this.setState({searchString:event.target.value});
  }

  handleClick() {
    // display quote of the selected Company


    this.setState({searchString: ''});

    // this.setState({searchString:event.target.textContent});
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

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
        // <div>
        // <input list="companies" />
        // <datalist id="companies">
        //   { companies.map(function(company){ return <option key={company.symbol} value={company.symbol + ": " + company.name} /> }) }
        // </datalist>
        // <input type="submit"/>
        // </div>
        <div>
        <input type="text" name="company" value={this.state.searchString} onChange={this.handleChange} placeholder="Company name or ticker symbol"/>
        <input type="submit"/>
        { companies.map(company => { return <div key={company.symbol} onClick={this.handleClick}>{company.symbol + ": " + company.name} </div> }) }
        </div>
    );
  }
}

export default QuoteSearchBar;
