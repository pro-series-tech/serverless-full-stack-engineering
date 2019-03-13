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

            let loginUrl = `cognito-idp.${AWS_REGION}.amazonaws.com/${USER_POOL_ID}`;
            /* create credentials object */
            let credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: IDENTITY_POOL_ID,
                Logins: {
                    [loginUrl]: action.payload
                }
            });
            return {
                ...state,
                credentials
            }
        case AUTHENTICATION_SIGN_OUT:
            return {
                ...state,
                credentials: initialState.credentials
            }
        default:
            return state
    }
}