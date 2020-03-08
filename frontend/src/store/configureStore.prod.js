import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';

export default function configureStore(initialState, history) {
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = applyMiddleware(thunk, reduxRouterMiddleware);

    return createStore(rootReducer, initialState, middleware);
}
