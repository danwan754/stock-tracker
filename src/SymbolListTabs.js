import React, { Component } from "react";
import Tab from "react-bootstrap/lib/Tab";
import Tabs from "react-bootstrap/lib/Tabs";
import './styles.css';



class SymbolListTabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });

    // return the selected watch list to parent component
    this.props.selectSymbol(key);
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        {this.props.symbolListArr.length > 0?
          this.props.symbolListArr.map((symbol, i) => { return (
            <Tab key={i} eventKey={symbol} title={symbol}></Tab>
          )}) : false
        }
      </Tabs>
    );
  }

}

export default SymbolListTabs;
