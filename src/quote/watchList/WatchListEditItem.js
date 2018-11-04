import React, { Component } from "react";
import './watch-list-styles.css';

class WatchListEditItem extends Component {


  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {
    let arr = event.target.id.split("-");
    this.props.handleRemove({
      watchList: arr[0],
      symbol: arr[1]
    })
  }

  render() {
    let quoteObj = this.props.quoteObj["quote"];
    return (
      <div className="watch-list-edit-item">
        <p className="symbolName">
          {quoteObj.symbol} :  {quoteObj.companyName}
        </p>
        <div className="watchListItemRemove">
          <input type="submit" value="X" id={this.props.watchListName + "-" + quoteObj.symbol} onClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

export default WatchListEditItem;
