import React from 'react';
import { NavLink, Route, Switch, Link } from 'react-router-dom';
import './App.css';

import LoginForm from './LoginForm'
import UserProfileForm from './UserProfileForm';
import FuelQuoteForm from './FuelQuoteForm';
import FuelQuoteHistoryForm from './FuelQuoteHistoryForm';

function App() {
  return (
    <main>
      <nav>
        <NavLink exact activeClassName='active' to="/login">
          Login &nbsp;&nbsp;
        </NavLink>
        <NavLink exact activeClassName='active' to="/profile">
          Manage Profile &nbsp;&nbsp;
        </NavLink>
        <NavLink exact activeClassName='active' to="/fuelquote">
          Fuel Quote &nbsp;&nbsp;
        </NavLink>
        <NavLink exact activeClassName='active' to="/quotehistory">
          Quote History &nbsp;&nbsp;
        </NavLink>
      </nav>
      <Switch>
      <Route path="/login" component={LoginForm}/>
      <Route path="/profile" component={UserProfileForm}/>
      <Route path="/fuelquote" component={FuelQuoteForm}/>
      <Route path="/quotehistory" component={FuelQuoteHistoryForm}/>
      </Switch>
    </main>
  )
}

export default App;
