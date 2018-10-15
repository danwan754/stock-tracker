import React, { Component } from "react";
import './styles.css';
import WatchListItem from './WatchListItem';



class WatchList extends Component {

  render() {
    // console.log("batchObj in WatchList component: ");
    // console.log(this.props.watchListObj);
    // console.log(this.props.watchListObj[Object.keys(this.props.watchListObj)[0]]["quote"])
    return (
      <div>
        <p className="watchListName">{this.props.watchListName}</p>
        {Object.keys(this.props.watchListObj).map((companyObj, i) => {
          return (this.props.watchListObj[companyObj]["quote"] ?
            <WatchListItem key={i} quoteObject={this.props.watchListObj[companyObj]["quote"]} watchListName={this.props.watchListName} handleRemove={this.props.handleRemove} />
            : ''
          )
        })}
      </div>
    )
  }
}

export default WatchList;

// <div className="watchListItemRemove" id={symbol} onClick={this.handleRemoveFromWatchList}>
//   <input type="submit" value="X" id={symbol} onClick={this.handleRemoveFromWatchList} />
// </div>
