import React, { Component } from "react";
import { Chart } from "react-google-charts";

class QuoteGraph extends Component {

  render() {

    var graphData = this.props.graphData;

    if (graphData === undefined || graphData.length == 0) {
      return (
        <div></div>
      )
    }
    else {

      if (this.props.period == "1d") {
        var xAxis = "minute";
      }
      else {
        var xAxis = "date";
      }

      var data = [
        [xAxis, "Price"]
      ];

      for (var i=0; i<Object.keys(graphData).length; i++) {
        data.push([graphData[i][xAxis], graphData[i]["close"]]);
      }

      var options = {
        title: "Change in Stock Price over " + this.props.period,
        legend: { position: "bottom" }
      }

      return (
        <div id="chart">
          <Chart
            chartType="LineChart"
            width="100%"
            height="500px"
            data={data}
            options={options}
          />
        </div>
      )
    }
  }
}

export default QuoteGraph;
