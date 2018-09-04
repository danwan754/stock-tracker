import React, { Component } from "react";

class NewsResult extends Component {

  render() {
    var newsObj = this.props.newsObj;

    if (Object.keys(newsObj).length > 0) {
      return (
        <div>
          <h3>Latest News</h3>
          { (newsObj["rss"]["channel"][0]["item"]).map(news =>
            { return (
              <div key={news.title} id="newsItem">
                <a href={news.link}>
                <span style={{display: "block"}}>
                  <p id="newsDate">{new Date(news.pubDate).toLocaleString()}</p>
                  <h3>{news.title}</h3>
                  <h4>{news.description}</h4>
                  <div id="newDiv">
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
