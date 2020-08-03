import React from "react";
import {Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";      //Home
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import Register from './containers/Register';
import FuelQuoteForm from "./containers/FuelQuoteForm";
import FuelHistory from './containers/FuelHistory';
import Profile from './containers/Profile';
import Logout from './containers/Logout'

export default function Routes()
{
    return (
        <Switch>
            <Route exact path = '/'>
                <Homepage />
            </Route>
            <Route exact path = '/login'>            {/*login*/}
                <Login />
            </Route>
            <Route exact path = '/register'>
                <Register />
            </Route>
            <Route exact path = '/profile'>
                <Profile />
            </Route>
            <Route exact path = '/getQuote'>
                <FuelQuoteForm />
            </Route>
            <Route exact path = '/history'>
                <FuelHistory />
            </Route> 
            <Route exact path = '/logout'>
                <Logout />
            </Route>

            {/*Catch unmatched routes*/}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
