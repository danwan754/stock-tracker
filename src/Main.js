import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import NaviBar from "./NaviBar";
import Home from "./Home";
import WatchLists from "./WatchLists";
import Quote from "./Quote";
import News from "./News";
import Contact from "./Contact";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NaviBar />
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/quote" component={Quote}/>
            <Route path="/news" component={News}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
