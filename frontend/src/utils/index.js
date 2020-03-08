import axios from 'axios'

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}

export const authAxios = axios.create({
    baseUrl: '/',
    withCredentials: 'true',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
    },
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
})

authAxios.interceptors.request.use(config => {
    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
    }
        return config
    }, function (error) {
        return Promise.reject(error)
    })

