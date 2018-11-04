import React, { Component } from "react";
import WatchList from './WatchList';
// import Button from "react-bootstrap/lib/Button";



class WatchListsRowContainer extends Component {

  render() {
    // console.log("batchObj in watchListsRowContainer Component: ");
    // console.log(this.props.batchObj);
    return (
      <div>
        {Object.keys(this.props.batchObj).map((watchList) => {
          return (
            <div className="watchList" key={watchList}>
              <div className="watch-list-left-side">
                <WatchList watchListName={watchList} watchListObj={this.props.batchObj[watchList]} handleRemove={this.props.handleRemove} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default WatchListsRowContainer;

// <input type="submit" value="X" id={watchList} onClick={this.handleConfirmRemove} />
