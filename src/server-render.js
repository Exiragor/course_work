import React from 'react';
import counterApp from './reducers'
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import { matchPath, RouterContext} from 'react-router';
import routes from './routes';

let handleRender = function(req, res) {

    matchPath({routes, location: req.url}, (error, redirectLocation, renderProps) => {

            // Create a new Redux store instance
            const store = createStore(counterApp);

            // Если необходимо сделать redirect
            if (redirectLocation) {
                return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
            }

            // Произошла ошибка любого рода
            if (error) {
                return res.status(500).send(error.message);
            }

            // Мы не определили путь, который бы подошел для URL
            if (!renderProps) {
                return res.status(404).send('Not found');
            }

            // Render the component to a string
            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            // Grab the initial state from our Redux store
            const preloadedState = JSON.stringify(store.getState());
            
            // Send the rendered page back to the client
            return res.render('index', {html, preloadedState});
        });
}
class Render {

    static handleRender(req, res) {

        match({routes, location: req.url}, (error, redirectLocation, renderProps) => {

            // Create a new Redux store instance
            const store = createStore(counterApp);

            // Если необходимо сделать redirect
            if (redirectLocation) {
                return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
            }

            // Произошла ошибка любого рода
            if (error) {
                return res.status(500).send(error.message);
            }

            // Мы не определили путь, который бы подошел для URL
            if (!renderProps) {
                return res.status(404).send('Not found');
            }

            // Render the component to a string
            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            // Grab the initial state from our Redux store
            const preloadedState = JSON.stringify(store.getState());
            
            // Send the rendered page back to the client
            return res.render('index', {html, preloadedState});
        });
    }

}


export default handleRender;

