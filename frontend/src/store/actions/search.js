import {
    SEARCH_MOBILE_OPEN,
    SEARCH_TEXT_CHANGE,
    SEARCH_SET,
    SEARCH_APPEND,
    SEARCH_LOADER_STATE,
    SEARCH_RESET
} from '../constants';

const paginationItemsCount = 6;

export function loadSearchResultsFail(error) {
    return {
        type: SEARCH_LOADER_STATE,
        error,
        isLoadMoreVisible: false
    };
}

export function loadSearchResultsSuccess(data) {
    return {
        type: SEARCH_SET,
        data,
        isLoadMoreVisible: data.numFound > paginationItemsCount
    };
}

export function clearSearch(e) {
    e.preventDefault();
    return {
        type: SEARCH_RESET,
        inputValue: ''
    };
}
export function showMobileSearch(e) {
    e.stopPropagation();
    e.preventDefault();
    return {
        type: SEARCH_MOBILE_OPEN
    };
}
