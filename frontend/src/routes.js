import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/';
import Register from './pages/Register/';
import Main from './pages/Main/';
import Box from './pages/Box';



const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ Login }/>
            <Route path="/register" exact component={Register} />
            <Route path="/home/:id"  component={ Main }/>
            <Route path="/folder/:id" component={ Box } />
        </Switch>
    </BrowserRouter>

);

export default Routes;