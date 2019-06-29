import React, { Component } from "react";
import Carousel from "react-bootstrap/lib/Carousel";
import "./styles.css";

class Home extends Component {
  render() {
    return (
      <div className="outter-div">
        <br/>
        <div className="main-content-wrapper">
          <p id="home-intro-p">Quote stocks, make watch lists, and read latest news that may affect your stocks.</p>
          <br/><br/>

          <div className="home-carousel-div">
            <Carousel className="custom-carousel" interval={4000}>
              <Carousel.Item>
                <img className="carousel-img" alt="900x500" src="/images/quote.PNG" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="carousel-img" alt="900x500" src="/images/watchlist.PNG" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="carousel-img" alt="900x500" src="/images/news.PNG" />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div className="footer">
          <p>Companies that are available to quote are U.S listed companies that are listed on <a href="https://iextrading.com/" target="_blank" rel="noopener noreferrer">IEX</a>.</p>
        </div>
      </div>
    );
  }
}

export default Home;
