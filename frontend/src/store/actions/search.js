import axios from 'axios';
import {
    SEARCH_MOBILE_OPEN,
    SEARCH_TEXT_CHANGE,
    SEARCH_SET,
    // SEARCH_APPEND,
    SEARCH_LOADER_STATE,
    SEARCH_RESET
} from '../constants';

export function loadSearchResultsFail(error) {
    return {
        type: SEARCH_LOADER_STATE,
        error
    };
}

export function loadSearchResultsSuccess(data) {
    return {
        type: SEARCH_SET,
        payload: {
            data: data
        }
    };
}

export function clearSearch(e) {
    e.preventDefault();
    return {
        type: SEARCH_RESET,
        input_value: ''
    };
}
export function showMobileSearch(e) {
    e.stopPropagation();
    e.preventDefault();
    return {
        type: SEARCH_MOBILE_OPEN
    };
}

export function searchTextChange(inputValue, shouldCallApi) {
    return dispatch => {
        dispatch({
            type: SEARCH_TEXT_CHANGE,
            payload: {
                input_value: inputValue
            }
        })
        if (shouldCallApi && inputValue.length > 2) {
            axios
                .get(`/api-job/annonce/?q=${inputValue}`)
                .then(response => {
                    dispatch(loadSearchResultsSuccess(response.data));
                })
                .catch(err => {
                    dispatch(loadSearchResultsFail(err))
                });
        }
    }
}

export function loadSearchResults(inputValue) {
    return dispatch => {
      dispatch({
        type: SEARCH_TEXT_CHANGE,
        payload: {
            input_value: inputValue
        }
      });
  
      if (inputValue.length > 2) {
        axios.get(`/api-job/annonce/?q=${inputValue}`)
          .then(response => {
            dispatch(loadSearchResultsSuccess(response.data));
          })
          .catch(error => {
              dispatch(loadSearchResultsFail(error));
          });
      }
    };
  }
