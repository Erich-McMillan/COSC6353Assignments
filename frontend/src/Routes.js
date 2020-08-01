import React from "react";
import {Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import Register from './containers/Register';
import FuelQuoteForm from "./containers/FuelQuoteForm";

export default function Routes()
{
    return (
        <Switch>
            <Route exact path = '/'>
                <Home />
            </Route>
            <Route exact path = '/login'>
                <Login />
            </Route>
            <Route exact path = '/register'>
                <Register />
            </Route>
            <Route exact path = '/getQuote'>
                <FuelQuoteForm />
            </Route>

            {/*Catch unmatched routes*/}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
