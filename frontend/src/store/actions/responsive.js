import {
    RESPONSIVE_DRAWER_OPEN,
} from '../constants';


export function setMobileDrawerOpen(isOpen) {
    return {
        type: RESPONSIVE_DRAWER_OPEN,
        payload: {
            isOpen
        }
    }
}

export const mobileDrawerOpen = payload => payload.responsive.mobileDrawerOpen.isOpen;
