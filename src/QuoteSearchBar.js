import React, { Component } from "react";

class QuoteSearchBar extends Component {

  // sets initial state
  constructor() {
    super();
    this.state = {
      searchString: '',
      companies: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // fetch('')
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
    return (
      <div>
        <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" />
      </div>
    );
  };
}

export default QuoteSearchBar;
