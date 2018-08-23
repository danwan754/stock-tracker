import React, { Component } from "react";

class NewsResult extends Component {

  render() {
    if (Object.keys(this.props.newsArray).length > 0) {
      return (
        <div>
        { this.props.newsArray.map(news =>
          { return (
            <a key={news.headline} href={news.url}>
            <span style={{display: "block"}}>
              <h2>{news.headline}</h2>
              <h3>{news.summary}</h3>
              <h3>{news.image}</h3>
              <h3>{news.url}</h3>
              <h4>{new Date(news.datetime).toLocaleString()}</h4>
            </span>
            </a>
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
