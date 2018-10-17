import React, { Component } from "react";
import Tab from "react-bootstrap/lib/Tab";
import Tabs from "react-bootstrap/lib/Tabs";
// import './styles.css';



class WatchListTabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 0
    };
  }

  handleSelect(key) {
    this.setState({ key });

    // return the selected watch list to parent component
    this.props.selectWatchList(key);
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
        className="newsTab"
      >
        {this.props.watchListsArr.length > 0? this.props.watchListsArr.map((watchList, i) => { return (
          <Tab key={i} eventKey={watchList} title={watchList}><br/></Tab>
          )}) : false
        }
      </Tabs>
    );
  }

}

export default WatchListTabs;
