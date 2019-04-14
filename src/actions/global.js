/**
 * This script exports the Global actions.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import {
    NAVIGATION_AUTHENTICATION_SWITCH_FORM
} from 'lib/types';
/**
 * Dispatch the form type to the global reducer in order to switch UI.
 * @param {string} formType 
 */
export const switchAuthenticationForm = (formType) => dispatch => {
    dispatch({
        type: NAVIGATION_AUTHENTICATION_SWITCH_FORM,
        payload: formType
    });
};