import {
    AUTHENTICATION_SIGN_IN,
    AUTHENTICATION_SIGN_UP,
    AUTHENTICATION_SIGN_OUT,
    AUTHENTICATION_RESEND_CODE,
    AUTHENTICATION_CHANGE_PASSWORD,
    AUTHENTICATION_CONFIRM_REGISTRATION,
} from "lib/types";

import Authentication from "lib/authentication";
/* instantiate authentication object */
const auth = new Authentication();
/** */
const authHelper = async (dispatch, actionType, authFunc, authParams)=>{
    try{
        let result = await authFunc(...authParams);
        dispatch({
            type: actionType,
            payload: result
        });
        return result;
    }catch(e){
        return e.message;
    }
};
export const signUp = (username, email, password) => async dispatch => {
    let attributes = [{
        Name: 'email',
        Value: email
    }];
    return await authHelper(
        dispatch, 
        AUTHENTICATION_SIGN_UP, 
        auth.signUp, 
        [username, password, attributes]
    );
};
export const signIn = (username, password) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_SIGN_IN,
        auth.signIn,
        [username, password]
    );
};
export const confirmRegistration = (username, code) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_CONFIRM_REGISTRATION,
        auth.confirmRegistration,
        [username, code]
    );
};
export const resendConfirmation = (username) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_RESEND_CODE,
        auth.resendConfirmation,
        [username]
    );
};
export const changePassword = (username, oldPassword, newPassword) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_CHANGE_PASSWORD,
        auth.changePassword,
        [username, oldPassword, newPassword]
    );
};
export const signOut = () => async dispatch => {
    dispatch({
        type: AUTHENTICATION_SIGN_OUT
    });
};