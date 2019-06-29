import React, { Component } from "react";
import Button from 'react-bootstrap/lib/Button';

class InputText extends Component {

  constructor() {
    super();
    this.state = {
      inputText: '', // new watch list name
      nameExists: false // new watch list name already exists
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.value,
      nameExists: false
    })
  }

  // verify new watch list name does not already exist and return to parent component
  handleSubmit() {
    if (this.props.watchListsArr.includes(this.state.inputText)) {
      this.setState({
        nameExists: true
      })
    }
    else {
      this.setState({
        inputText: ''
      });
      this.props.newWatchList(this.state.inputText);
    }
  }

  render() {
    return (
      <div>
        {this.state.nameExists? <p>{this.state.inputText} is already a watch list.</p> : ''}
        <input type="text" onChange={this.handleChange} value={this.state.inputText} placeholder="New watch list name" />
        {this.state.inputText? <Button type="submit" onClick={this.handleSubmit}>Add to {this.state.inputText}</Button> : ''}
      </div>
    )
  }

}
export default InputText;
