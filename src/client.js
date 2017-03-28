import * as React from 'react';
import * as ReactDOM from 'react-dom';
import routes from './routes'
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import counterApp from './reducers';
import config from './config';

let preloadedState = window.__PRELOADED_STATE__ || {};
let store;
config.mode === 'dev' ? 
    store = createStore(counterApp, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 
    : store = createStore(counterApp, preloadedState);

ReactDOM.render(
    <Provider store={store}>
        { routes }
    </Provider>,
    document.getElementById('root'));