/**
 * This script exports the Template reducer.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* store initial state constant */
const initialState = {
    otherValue: 'hello',
    myDate: new Date()
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                myDate: action.payload
            }
        default:
            return state
    }
}