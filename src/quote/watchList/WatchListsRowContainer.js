import React, { Component } from "react";
import WatchList from './WatchList';


class WatchListsRowContainer extends Component {

  render() {
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
