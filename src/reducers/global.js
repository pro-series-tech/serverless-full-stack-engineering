import { 
    NAVIGATION_AUTHENTICATION_SIGN_IN,
    NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
    NAVIGATION_AUTHENTICATION_SWITCH_FORM
} from "lib/types";

const initialState = {
    authenticationForm: NAVIGATION_AUTHENTICATION_SIGN_IN,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATION_AUTHENTICATION_SWITCH_FORM:
            return {
                ...state,
                authenticationForm: action.payload
            }
        case NAVIGATION_AUTHENTICATION_SWITCH_FORM:
            return {
                ...state,
                authenticationForm: action.payload
            }
        default:
            return state
    }
}