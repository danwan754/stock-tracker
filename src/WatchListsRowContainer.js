import React, { Component } from "react";
import './styles.css';
import WatchList from './WatchList';


class WatchListsRowContainer extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleConfirmRemove = this.handleConfirmRemove.bind(this);
  }

  handleClick(event) {
    let watchList = event.target.id;
  }

  handleConfirmRemove(event) {
    let watchListObj = {
      watchList: event.target.id,
      symbol: ''
    }
    this.props.handleRemove(watchListObj);
  }

  render() {
    // console.log("batchObj in watchListsRowContainer Component: ");
    // console.log(this.props.batchObj);
    return (
      <div>
        {Object.keys(this.props.batchObj).map((watchList) => {
          return (
            <div className="inline watchList" key={watchList}>
              <div className="inline">
                <WatchList watchListName={watchList} watchListObj={this.props.batchObj[watchList]} handleRemove={this.props.handleRemove} />
              </div>
              <div className="inline watch-list-remove">
                <input type="submit" value="X" id={watchList} onClick={this.handleConfirmRemove} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default WatchListsRowContainer;
