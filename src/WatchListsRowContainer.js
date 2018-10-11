import React, { Component } from "react";
import './styles.css';
import WatchList from './WatchList';


class WatchListsRowContainer extends Component {

  render() {
    return (
      <div>
        {Object.keys(this.props.batchObj).map(watchList => {
          return <WatchList key={watchList} watchListName={watchList} watchListObj={this.props.batchObj[watchList]} handleRemove={this.props.handleRemove} />
        })}
      </div>
    )
  }
}

export default WatchListsRowContainer;
