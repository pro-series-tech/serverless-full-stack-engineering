import {
    NAVIGATION_AUTHENTICATION_SWITCH_FORM
} from "lib/types";

export const switchAuthenticationForm = (formType, data) => dispatch => {
    dispatch({
        type: NAVIGATION_AUTHENTICATION_SWITCH_FORM,
        payload: formType
    });
};