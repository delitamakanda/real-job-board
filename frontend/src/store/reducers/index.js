import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import responsiveReducer from './responsive';
import searchReducer from './search';

export default combineReducers({
    auth: authReducer,
    responsive: responsiveReducer,
    search: searchReducer,
    routing: routerReducer
});
