import React, { Component } from "react";
import { Chart } from "react-google-charts";

class QuoteGraph extends Component {

  constructor() {
    super();
    this.state = {
      graphObj: [],
      period: '1 Month',
      periodArr: ['1 Day', '1 Month', '3 Months', '6 Months', 'Year to Date', '1 Year', '2 Years', '5 Years']
    }
    this.handleChartChange = this.handleChartChange.bind(this);
  }

  // if parent component pass same symbol as previous, then don't re-render
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.symbol === nextProps.symbol) {
      return false;
    }
    return true;
  }

  handleChartChange(event) {
    var selectedPeriod = event.target.textContent;
    var period;
    switch(selectedPeriod) {
      case "1 Day":
        period = "1d";
        break;
      case "3 Months":
        period = "3m";
        break;
      case "6 Months":
        period = "6m";
        break;
      case "Year to Date":
        period = "ytd";
        break;
      case "1 Year":
        period = "1y";
        break;
      case "2 Years":
        period = "2y";
        break;
      case "5 Years":
        period = "5y";
        break;
      default:
        period = "1m";
        break;
    }

    if (this.props.symbol ) {
      var url = "/api/chart?period=" + period + "&symbol=" + this.props.symbol;
      fetch(url)
      .then(response => { return response.json() })
      .then(data => { this.setState({ graphObj: data,
                                      period: selectedPeriod });
                      this.forceUpdate();
      });
    }
  }

  render() {

    var graphObj;
    if (this.props.graphObj === undefined || this.props.graphObj.length === 0) {
      return (
        <div></div>
      )
    }
    else {
      // use the props graph object if state graphObj is empty
      if (this.state.graphObj === undefined || this.state.graphObj.length === 0) {
        graphObj = this.props.graphObj;
      }
      else {
        graphObj = this.state.graphObj;
      }

      var xAxis;
      if (this.props.period === "1 day") {
        xAxis = "minute";
      }
      else {
        xAxis = "date";
      }

      var data = [
        [xAxis, "Price"]
      ];

      for (var i=0; i<Object.keys(graphObj).length; i++) {
        data.push([graphObj[i][xAxis], graphObj[i]["close"]]);
      }

      var options = {
        title: "Change in Stock Price over " + this.state.period,
        legend: { position: "bottom" }
      }

      if (this.props.symbol) {
        return (
          <div id="chart">
            <Chart
              chartType="LineChart"
              width="100%"
              height="500px"
              data={data}
              options={options}
            />
            {(this.state.periodArr).map(period => {
              return (
                <div key={period} className="period" onClick={this.handleChartChange}>
                  {period}
                </div>
              )
            })}
          </div>
        )
      }
      else {
        return (<div></div>);
      }
    }
  }
}

export default QuoteGraph;
