/**
 * Dispatches the action to set date into reducerTemplate.
 * @param {Date} date
 */
export const myAction = date => dispatch => {
	dispatch({
		type: "SET_DATE",
		payload: date
	});
};
