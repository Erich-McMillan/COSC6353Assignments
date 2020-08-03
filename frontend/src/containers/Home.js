import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from './src/Routes'

export default function Home() {
  return (
    <div className="Home">
      {/* <div className="lander">
        <p>Login to access profile. If you are not a member, please register.</p>
      </div> */}
        <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/getProfile">Manage Profile</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to = '/getQuote'>
              <NavItem>Get Quote</NavItem>
            </LinkContainer>
            <LinkContainer to = '/history'>
              <NavItem>Order History</NavItem>
            </LinkContainer>
            <LinkContainer to = '/logout'>
              <NavItem>Logout</NavItem>
            </LinkContainer>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}
