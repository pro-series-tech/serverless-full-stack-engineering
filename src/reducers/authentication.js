/**
 * This script exports the Authentication reducer.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* local imports */
import { 
    AUTHENTICATION_SIGN_IN,
    AUTHENTICATION_SIGN_UP,
    AUTHENTICATION_SIGN_OUT,
    AUTHENTICATION_SET_USERNAME
} from 'lib/types';
/* store initial state constant */
const initialState = {
    username: null,
    credentials: null
};
export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case AUTHENTICATION_SIGN_UP:
            return {
                ...state,
                username: action.payload
            }
        case AUTHENTICATION_SIGN_IN:
            return {
                ...state,
                credentials: action.payload
            }
        case AUTHENTICATION_SIGN_OUT:
            return initialState;
        default:
            return state
    }
}