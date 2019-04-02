import {
    AUTHENTICATION_SIGN_IN,
    AUTHENTICATION_SIGN_UP,
    AUTHENTICATION_SIGN_OUT,
    AUTHENTICATION_RESEND_CODE,
    AUTHENTICATION_SET_USERNAME,
    AUTHENTICATION_CHANGE_PASSWORD,
    AUTHENTICATION_FORGOT_PASSWORD,
    AUTHENTICATION_CONFIRM_PASSWORD,
    AUTHENTICATION_CONFIRM_REGISTRATION,
    NAVIGATION_AUTHENTICATION_SWITCH_FORM,
    NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT
} from 'lib/types';

import Authentication from 'lib/authentication';
/* instantiate authentication object */
const auth = new Authentication();
const authHelper = async (dispatch, actionType, authFunc, authParams)=>{
    try{
        let result = await authFunc(...authParams);
        dispatch({
            type: actionType,
            payload: result
        });
    }catch(e){
        return e.message;
    }
};
export const signUp = (username, email, password) => async dispatch => {
    let attributes = [{
        Name: 'email',
        Value: email
    }];
    let error = await authHelper(
        dispatch, 
        AUTHENTICATION_SIGN_UP, 
        auth.signUp, 
        [username, password, attributes]
    );
    /* if sign up succeed, dispatch other actions */
    if(!error){
        dispatch({
            type: NAVIGATION_AUTHENTICATION_SWITCH_FORM,
            payload: NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT
        });
    }
    return error;
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
export const forgotPassword = (username) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_FORGOT_PASSWORD,
        auth.forgotPassword,
        [username]
    );
};
export const confirmPassword = (username, verificationCode, newPassword) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_CONFIRM_PASSWORD,
        auth.confirmPassword,
        [username, verificationCode, newPassword]
    );
};
export const signOut = () => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_SIGN_OUT,
        auth.signOut,
        []
    );
};
export const setUsername = (username) => dispatch => {
    dispatch({
        type: AUTHENTICATION_SET_USERNAME,
        payload: username
    });
};