import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';
import DevTools from '../containers/dev/DevTools';

export default function configureStore(initialState, history) {
    const logger = createLogger();

    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = applyMiddleware(thunk, logger, reduxRouterMiddleware);

    const middlewareWithDevTools = compose(
        middleware,
        DevTools.instrument()
    );

    // const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(rootReducer, middlewareWithDevTools);

    if (module.hot) {
        module.hot
            .accept('./reducers', () => {
                const nextRootReducer = require('./reducers/index');

                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}
