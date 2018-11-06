import React, { Component } from "react";
import WatchListEditItem from './WatchListEditItem';
import Panel from 'react-bootstrap/lib/Panel';

class WatchListMainEdit extends Component {

  constructor() {
    super();
    // this.handleClick = this.handleClick.bind(this);
    this.handleConfirmRemove = this.handleConfirmRemove.bind(this);
  }

  // handleClick(event) {
  //   let watchList = event.target.id;
  // }

  handleConfirmRemove(event) {
    let watchListObj = {
      watchList: event.target.id,
      symbol: ''
    }
    this.props.handleRemove(watchListObj);
  }


  render() {
    // console.log("watchListMainEdit component: ");
    // console.log(this.props.watchListObj);
    // console.log(this.props.watchListName);
    // console.log(this.props.watchListObj["WMT"]["quote"]);

    return (
      <Panel>
        <Panel.Heading>
          <div className="watchListContainer">
            <div className="watchListName">
              {this.props.watchListName}
            </div>
            <div className="watch-list-remove">
              <input type="submit" value="X" id={this.props.watchListName} onClick={this.handleConfirmRemove} />
            </div>
          </div>
        </Panel.Heading>
        <Panel.Body>
          {Object.keys(this.props.watchListObj).map((company, i) => { return (
            <WatchListEditItem key={i} watchListName={this.props.watchListName} quoteObj={this.props.watchListObj[company]} handleRemove={this.props.handleRemove} />
          )})}
        </Panel.Body>
      </Panel>
    )
  }
}

export default WatchListMainEdit;
