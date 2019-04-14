/**
 * This script exports the Global reducer.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* local imports */
import { 
    NAVIGATION_AUTHENTICATION_SIGN_IN,
    NAVIGATION_AUTHENTICATION_SWITCH_FORM
} from 'lib/types';
/* store initial state constant */
const initialState = {
    /* the Sign In form is the default form */
    authenticationForm: NAVIGATION_AUTHENTICATION_SIGN_IN,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATION_AUTHENTICATION_SWITCH_FORM:
            return {
                ...state,
                authenticationForm: action.payload
            }
        default:
            return state
    }
}