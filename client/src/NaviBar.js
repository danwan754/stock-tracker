import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib';


class NaviBar extends Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect className="navbar-custom">
        <Navbar.Header>
          <Link to='/' className='navbar-brand'>StockTracker</Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer exact to="/">
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/quote">
              <NavItem>Quote</NavItem>
            </LinkContainer>
            <LinkContainer to="/news">
              <NavItem>News</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact">
              <NavItem>Contact</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NaviBar;
