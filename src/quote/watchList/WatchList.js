import React, { Component } from "react";
import './watch-list-styles.css';
import WatchListItem from './WatchListItem';
import WatchListEditModal from './WatchListEditModal';
import Panel from 'react-bootstrap/lib/Panel';

class WatchList extends Component {

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <div className="watchListContainer">
            <div className="watchListName">
              {this.props.watchListName}
            </div>
            <div className="watch-list-options">
              <WatchListEditModal watchListName={this.props.watchListName} watchListObj={this.props.watchListObj} handleRemove={this.props.handleRemove} />
            </div>
          </div>
        </Panel.Heading>
        <Panel.Body>
          {Object.keys(this.props.watchListObj).map((companyObj, i) => {
            return (this.props.watchListObj[companyObj]["quote"] ?
              <WatchListItem key={i} quoteObject={this.props.watchListObj[companyObj]["quote"]} watchListName={this.props.watchListName} handleRemove={this.props.handleRemove} />
              : ''
            )
          })}
        </Panel.Body>
      </Panel>
    )
  }
}

export default WatchList;
