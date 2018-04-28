import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import WatchLists from "./WatchLists";
import Quote from "./Quote";
import Ratings from "./Ratings";
import News from "./News";
import Contact from "./Contact";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Stock Analyzer</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/watchlists">Watch Lists</NavLink></li>
            <li><NavLink to="/quote">Quote</NavLink></li>
            <li><NavLink to="/ratings">Ratings</NavLink></li>
            <li><NavLink to="/news">News</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/watchlists" component={WatchLists}/>
            <Route path="/quote" component={Quote}/>
            <Route path="/ratings" component={Ratings}/>
            <Route path="/news" component={News}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
