import React, { Component } from "react";

class NewsResult extends Component {

  render() {

    if (Object.keys(this.props.newsArray).length > 0) {
      return (
        <div>
          <h3>Latest News</h3>
          { this.props.newsArray.map(news =>
            { return (
              <div key={news.headline}>
                <a href={news.url}>
                <span style={{display: "block"}}>
                  <h3>{news.headline}</h3>
                  <h4>{news.summary}</h4>
                  <div id="newDiv">
                    <p id="newsSource">Source: {news.source}</p>
                    <p id="newsDate">{new Date(news.datetime).toLocaleString()}</p>
                  </div>
                </span>
                </a>
                <hr/>
              </div>
            )}
          )}
        </div>
      )
    }
    else {
      return (<div></div>)
    }
  }
}

export default NewsResult;