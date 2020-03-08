import axios from 'axios';
import { push } from 'react-router-redux';
import { checkHttpStatus, parseJSON } from '../../utils';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGOUT_USER,
    RESET_AUTH_LOGIN_USER_FAILURE
} from '../constants';

export function authLoginUserSuccess(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token,
            user
        }
    };
}

export function resetAuthLoginUserFailure() {
    return {
        type: RESET_AUTH_LOGIN_USER_FAILURE
    };
}

export function authLoginUserFailure(error, message) {
    localStorage.removeItem('token');
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authLoginUserRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

export function authLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT_USER
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}

export function authLogoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(authLogout());
        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

export function authLoginUser(username, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        axios
            .post('/rest-auth/login/', {
                email: username,
                password: password
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(authLoginUserSuccess(response.token, response.user));
                dispatch(push(redirect));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export const authSignup = (email, password1, password2) => {
    return dispatch => {
        dispatch(authLoginUserRequest())
        axios
            .post('/rest-auth/registration/', {
                email: email,
                password1: password1,
                password2: password2
            })
            .then(res => {
                const token = res.data.key
                const user = res.data.user
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token', token)
                localStorage.setItem('user', user)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authLoginUserSuccess(token, user))
                dispatch(checkAuthTimeout(3600))
            })
            .catch(err => {
                dispatch(authLoginUserFailure(401, err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token === undefined) {
            dispatch(authLogout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(authLogout())
            } else {
                dispatch(authLoginUserSuccess(token, user))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}