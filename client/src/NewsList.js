import React, { Component } from "react";

class NewsList extends Component {


  render() {

    if (typeof this.props.newsObj === 'undefined' || Object.keys(this.props.newsObj).length == 0) {
      return (
        <div></div>
      )
    }
    else {
      return (
        <div className="newsList">
          { (this.props.newsObj["rss"]["channel"][0]["item"].slice(0, this.props.sliceLimit)).map(news =>
            { return (
              <div key={news.title} className="newsItem">
                <a href={news.link} className="newsLink" target="_blank">
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
