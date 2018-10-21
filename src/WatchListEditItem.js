import React, { Component } from "react";
import './styles.css';

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
        <p className="symbolName inline">
          {quoteObj.symbol} :  {quoteObj.companyName}
        </p>
        <div className="watchListItemRemove inline">
          <input type="submit" value="X" id={this.props.watchListName + "-" + quoteObj.symbol} onClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

export default WatchListEditItem;
