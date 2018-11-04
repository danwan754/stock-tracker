import React, { Component } from "react";
import WatchListEditItem from './WatchListEditItem';

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
      <div>
        <p className="watchListName">
          {this.props.watchListName}
        </p>
        <div className="watch-list-remove">
          <input type="submit" value="X" id={this.props.watchListName} onClick={this.handleConfirmRemove} />
        </div>
        {Object.keys(this.props.watchListObj).map((company, i) => { return (
          <WatchListEditItem key={i} watchListName={this.props.watchListName} quoteObj={this.props.watchListObj[company]} handleRemove={this.props.handleRemove} />
        )})}
      </div>
    )
  }
}

export default WatchListMainEdit;
