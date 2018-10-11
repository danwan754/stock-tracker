import React, { Component } from "react";
import './styles.css';
import WatchListItem from './WatchListItem';



class WatchList extends Component {

  render() {
    return (
      <div>
        <p>this.props.watchListName</p>
        {Object.keys(this.props.watchListObj).map(companyObj => {
          return <WatchListItem quoteObject={companyObj["quote"]} watchListName={this.props.watchListName} handleRemove={this.props.handleRemove} />
        })}
      </div>
    )
  }
}

export default WatchList;

// <div className="watchListItemRemove" id={symbol} onClick={this.handleRemoveFromWatchList}>
//   <input type="submit" value="X" id={symbol} onClick={this.handleRemoveFromWatchList} />
// </div>
