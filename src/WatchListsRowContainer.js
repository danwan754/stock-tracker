import React, { Component } from "react";
import './styles.css';
import WatchList from './WatchList';


class WatchListsRowContainer extends Component {

  render() {
    // console.log("batchObj in watchListsRowContainer Component: ");
    // console.log(this.props.batchObj);
    return (
      <div>
        {Object.keys(this.props.batchObj).map((watchList) => {
          return (
            <div className="inline watchList" key={watchList}>
              <WatchList watchListName={watchList} watchListObj={this.props.batchObj[watchList]} handleRemove={this.props.handleRemove} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default WatchListsRowContainer;
