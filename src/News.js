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
    fetch(url)
    .then(response => { return response.json() })
    .then(data => { this.setState( {newsObj: data} )
    });
  }

  render() {

    if (Object.keys(newsObj).length > 0) {
      return (
        <div>
          <h2>News</h2>
          <p>Investing News</p>
          <div>
            {this.state.newsObj.map(news => {
              return (
                <div>
                  
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
