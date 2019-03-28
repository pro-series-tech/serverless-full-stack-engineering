import AWS from 'aws-sdk';
import { 
    USER_POOL_ID, 
    IDENTITY_POOL_ID, 
    AWS_REGION
} from 'lib/environment';
import { 
    AUTHENTICATION_SIGN_IN,
    AUTHENTICATION_SIGN_OUT,
    AUTHENTICATION_SIGN_UP,
    AUTHENTICATION_SET_USERNAME,
} from "lib/types";

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