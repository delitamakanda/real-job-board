import {
    RESPONSIVE_DRAWER_OPEN
} from '../constants';

export const initialState = {
    mobileDrawerOpen: false
};

export default function responsiveReducer(state = initialState, action) {
    switch (action.type) {
        case RESPONSIVE_DRAWER_OPEN:
            return Object.assign({}, state, {
                mobileDrawerOpen: action.payload
            });
        default:
            return state;
    }
}
