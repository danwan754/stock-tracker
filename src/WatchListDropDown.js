import React, { Component } from "react";
import InputText from './InputText';

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class WatchListDropDown extends Component {

  constructor() {
    super();
    this.state = {
      // arr: ["tech", "weed"], // testing only - TO REMOVE
      // show: true // show the create watch list input field in dropdown
      open: false, // control visibility of dropdown
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.keepOpen = this.keepOpen.bind(this);
    this.getNewWatchList = this.getNewWatchList.bind(this);
  }

  handleSelect(eventKey) {
    let watchList = eventKey;
    console.log("selected watchlist: " + watchList);
    this.props.watchList(watchList);
  }

  // keep the dropdown open for user text input
  keepOpen() {
    this.setState({
      open: true,
    })
  }

  toggleDropdown() {
    if (this.state.open) {
      this.setState({
        open: false
      })
    }
    else {
      this.setState({
        open: true
      })
    }
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.textContent
    })
  }

  // get the name of the new watch list and return to parent component
  getNewWatchList(watchList) {
    console.log("watchList: " + watchList);
    this.props.watchList(watchList);
  }

  render() {
    // console.log("watchListsArr in WatchListDropDown: ");
    // console.log(this.props.watchListsArr);
    // if (this.props.watchListsArr === undefined || this.props.watchListsArr.length == 0) {
    //   return (<div></div>)
    // }

    return (
      <ButtonToolbar>
        <DropdownButton
          bsStyle={'default'}
          title="Add to watch list"
          id={'dropdown-basic'}
        >
          {this.props.watchListsArr.map((watchList, i) => { return <MenuItem eventKey={watchList} key={i} onSelect={this.handleSelect}>{watchList}</MenuItem> })}
          <MenuItem divider />
          <InputText newWatchList={this.getNewWatchList} watchListsArr={this.props.watchListsArr} />
        </DropdownButton>
      </ButtonToolbar>
    )
  }
}

export default WatchListDropDown;
