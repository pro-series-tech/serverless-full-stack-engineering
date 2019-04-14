/**
 * This script exports the authentication actions.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
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
/* Create constant authentication instance */
const auth = new Authentication();
/**
 * This function is helper to reduce redundant code that calls authentication functions.
 * @async
 * @param {Function} dispatch Redux-thunk dispatch function.
 * @param {string} actionType Action value to be dispatch.
 * @param {Function} authFunc The authentication function to be invoked.
 * @param {Any[]} authParams A list of arguments for the authentication function.
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
const authHelper = async (dispatch, actionType, authFunc, authParams) => {
    try {
        let result = await authFunc(...authParams);
        dispatch({
            type: actionType,
            payload: result
        });
    } catch (e) {
        return e.message;
    }
};
/**
 * Signs up and dispatch sign up action to the authentication reducer.
 * @async
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
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
    if (!error) {
        dispatch({
            type: NAVIGATION_AUTHENTICATION_SWITCH_FORM,
            payload: NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT
        });
    }
    return error;
};
/**
 * Sign in and dispatch sign in action to the authentication reducer.
 * @async
 * @param {string} username 
 * @param {string} password
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const signIn = (username, password) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_SIGN_IN,
        auth.signIn,
        [username, password]
    );
};
/**
 * Confirm registration and dispatch registration confirmation action to the authentication reducer.
 * @async
 * @param {string} username 
 * @param {string} code 
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const confirmRegistration = (username, code) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_CONFIRM_REGISTRATION,
        auth.confirmRegistration,
        [username, code]
    );
};
/**
 * Dispatch resend email confirmation action to the authentication reducer.
 * @async
 * @param {string} username 
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const resendConfirmation = (username) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_RESEND_CODE,
        auth.resendConfirmation,
        [username]
    );
};
/**
 * Dispatch the change password action to the authentication reducer.
 * @async
 * @param {string} username 
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const changePassword = (username, oldPassword, newPassword) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_CHANGE_PASSWORD,
        auth.changePassword,
        [username, oldPassword, newPassword]
    );
};
/**
 * Dispatch the forgot password action to the authentication reducer.
 * @async
 * @param {string} username 
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const forgotPassword = (username) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_FORGOT_PASSWORD,
        auth.forgotPassword,
        [username]
    );
};
/**
 * Dispatch the confirm password action to the authentication reducer.
 * @async
 * @param {string} username 
 * @param {string} verificationCode 
 * @param {string} newPassword 
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const confirmPassword = (username, verificationCode, newPassword) => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_CONFIRM_PASSWORD,
        auth.confirmPassword,
        [username, verificationCode, newPassword]
    );
};
/**
 * Dispatch the sign out action to the authentication reducer.
 * @async
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const signOut = () => async dispatch => {
    return await authHelper(
        dispatch,
        AUTHENTICATION_SIGN_OUT,
        auth.signOut,
        []
    );
};
/**
 * Dispatch the set-username action to the authentication reducer.
 * @param {string} username 
 */
export const setUsername = (username) => dispatch => {
    dispatch({
        type: AUTHENTICATION_SET_USERNAME,
        payload: username
    });
};