import React from 'react';
import { NavLink, Route, Switch, Link } from 'react-router-dom';
import './App.css';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserProfileForm from './UserProfileForm';
import FuelQuoteForm from './FuelQuoteForm';
import FuelQuoteHistoryForm from './FuelQuoteHistoryForm';

function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(()=>{
    fetch('/api').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <main>
      <nav>
        <NavLink exact activeClassName='active' to="/login">
          Login
        </NavLink>
        <NavLink exact activeClassName='active' to="/register">
          REgister
        </NavLink>
        <NavLink exact activeClassName='active' to="/profile">
          Profile
        </NavLink>
        <NavLink exact activeClassName='active' to="/fuelquote">
          FuelQuote
        </NavLink>
        <NavLink exact activeClassName='active' to="/quotehistory">
          QuoteHistory
        </NavLink>
      </nav>
      <Switch>
      <Route path="/login" component={LoginForm}/>
      <Route path="/register" component={RegisterForm}/>
      <Route path="/profile" component={UserProfileForm}/>
      <Route path="/fuelquote" component={FuelQuoteForm}/>
      <Route path="/quotehistory" component={FuelQuoteHistoryForm}/>
      </Switch>
      <h1>{initialData.title}</h1>
    </main>
  )
}

export default App;
