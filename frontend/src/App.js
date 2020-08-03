import React from 'react';
import { Link, useHistory, BrowserRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import './App.css';
import Route from './Routes';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './containers/Login';
import Register from './containers/Register';
import Homepage from './Homepage';

function App() {
  return (
    //<div className="App">
    <BrowserRouter>

    <div>
    <Route path={"/login"} component={Login} />
        
    </div>
    </BrowserRouter>
        
  //</div>
  );
}

export default App;


{/* <div className="App">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to = '/register'>
              <NavItem>Register</NavItem>
            </LinkContainer>
            <LinkContainer to = '/login'>
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to = '/profile'>
              <NavItem>Profile</NavItem>
            </LinkContainer>
            <LinkContainer to = '/getQuote'>
              <NavItem>Get Quote</NavItem>
            </LinkContainer>
            <LinkContainer to = '/getHistory'>
              <NavItem>Order History</NavItem>
            </LinkContainer>
            <LinkContainer to = '/logout'>
              <NavItem>Logout</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div> */}