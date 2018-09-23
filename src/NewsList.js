import React, { Component } from "react";

class NewsList extends Component {


  render() {

    if (typeof this.props.newsObj === 'undefined' || Object.keys(this.props.newsObj).length == 0) {
      console.log("no news")
      return (
        <div></div>
      )
    }
    else {
      console.log("there is news")
      return (
        <div className="newsList">
          { (this.props.newsObj["rss"]["channel"][0]["item"]).map(news =>
            { return (
              <div key={news.title} className="newsItem">
                <a href={news.link} className="newsLink">
                <span style={{display: "block"}}>
                  <p id="newsDate">{new Date(news.pubDate).toLocaleString()}</p>
                  <p className="newsTitle">{news.title}</p>
                  <p className="newsDescription">{news.description}</p>
                </span>
                </a>
              </div>
            )}
          )}
        </div>
      )
    }
  }
}
export default NewsList;
