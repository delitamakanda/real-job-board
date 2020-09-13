import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import responsiveReducer from './responsive';

export default combineReducers({
    auth: authReducer,
    responsive: responsiveReducer,
    routing: routerReducer
});
