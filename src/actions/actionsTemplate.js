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
