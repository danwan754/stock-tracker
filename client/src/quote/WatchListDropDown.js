import React, { Component } from "react";
import InputText from './InputText';

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class WatchListDropDown extends Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.getNewWatchList = this.getNewWatchList.bind(this);
  }

  handleSelect(eventKey) {
    let watchList = eventKey;
    this.props.watchList(watchList);
  }

  // get the name of the new watch list and return to parent component
  getNewWatchList(watchList) {
    this.props.watchList(watchList);
  }

  render() {
    return (
      <ButtonToolbar>
        <DropdownButton
          bsStyle={'default'}
          title="Add to watch list"
          id={'dropdown-basic'}
        >
          {this.props.watchListsArr.map((watchList, i) => {
            return (
              <MenuItem eventKey={watchList} key={i} onSelect={this.handleSelect}>
                {watchList}
              </MenuItem>
            )
          })}
          <MenuItem divider />
          <InputText newWatchList={this.getNewWatchList} watchListsArr={this.props.watchListsArr} />
        </DropdownButton>
      </ButtonToolbar>
    )
  }
}

export default WatchListDropDown;
