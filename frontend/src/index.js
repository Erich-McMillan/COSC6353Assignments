import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';

ReactDOM.render(
  <Router>
      <App />
  </Router>,
  document.getElementById('root')
);
