import React, { Component } from "react";

class NewsResult extends Component {

  render() {
    if (Object.keys(this.props.newsArray).length > 0) {
      // console.log(new Date(this.props.newsArray[0].datetime).toLocaleString());
      return (
        <div>
        { this.props.newsArray.map(news =>
          { return (
            <div key={news.headline}>
              <h2>{news.headline}</h2>
              <h3>{news.summary}</h3>
              <h3>{news.image}</h3>
              <h3>{news.url}</h3>
              <h4>{new Date(news.datetime).toLocaleString()}</h4>
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
