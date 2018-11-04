import React, { Component } from "react";
import './watch-list-styles.css';
import WatchListItem from './WatchListItem';
import WatchListEditModal from './WatchListEditModal';

class WatchList extends Component {

  render() {
    // console.log("batchObj in WatchList component: ");
    // console.log(this.props.watchListObj);
    // console.log(this.props.watchListObj[Object.keys(this.props.watchListObj)[0]]["quote"])
    return (
      <div className="watchListContainer">
        <p className="watchListName">
          {this.props.watchListName}
        </p>
        <div className="watch-list-remove">
          <WatchListEditModal watchListName={this.props.watchListName} watchListObj={this.props.watchListObj} handleRemove={this.props.handleRemove} />
        </div>
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
