import * as React from 'react';
import { Router, Route, browserHistory }  from 'react-router';
import Home from '../components/Home';


export default (
    <Router  history={browserHistory}>
        <Route component={Home} path='/' />
    </Router>
);