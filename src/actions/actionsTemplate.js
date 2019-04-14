/**
 * This script exports the template action functions.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/**
 * Dispatch the action to set date into reducerTemplate reducer.
 * @param {Date} date
 */
export const myAction = date => dispatch => {
	dispatch({
		type: "SET_DATE",
		payload: date
	});
};
