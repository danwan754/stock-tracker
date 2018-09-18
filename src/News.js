import React, { Component } from "react";

class News extends Component {

  constructor() {
    super();
    this.state = {
      newsObj: {}
    }
  }

  componentDidMount() {

    /* get latest news reports */
    var numNewsReports = 10;
    var url = "https://api.iextrading.com/1.0/stock/market/news/last/" + numNewsReports;
    console.log(url);
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState( {newsObj: data} )
    });
  }

  render() {

    if (Object.keys(this.state.newsObj).length > 0) {
      return (
        <div>
          <h2>News</h2>
          <p>Investing News</p>
          <div>
            {this.state.newsObj.map(news => {
              return (
                <div key={news.headline}>
                  <h4>{news.headline}</h4>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

export default News;
