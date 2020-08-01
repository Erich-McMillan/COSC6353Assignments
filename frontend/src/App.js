import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import './App.css';
import Routes from './Routes';
import { LinkContainer } from 'react-router-bootstrap';


{/*async function handleLogout (){
  await; (Signout)
  
  history.push('/login');
}
*/}

function App() {
  return (
    <div className="App">
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
            <LinkContainer to = '/getQuote'>
              <NavItem>Get Quote</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
