/**
 * This script exports the CRUD actions.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import {
    CRUD_SET_IMAGE_RECORD,
    CRUD_SWITCH_MODAL_VISIBILITY
} from 'lib/types';
/**
 * Dispatch switch modal visibility and reset image record to corresponding reducers.
 * @param {boolean} show 
 */
export const switchModalVisibility = (show) => dispatch => {
    dispatch({
        type: CRUD_SWITCH_MODAL_VISIBILITY,
        payload: show
    });
    dispatch({
        type: CRUD_SET_IMAGE_RECORD,
        payload: null
    });
};
/**
 * Dispatch set image record to the CRUD reducer.
 * @param {Object} record 
 */
export const setImageRecord = (record) => dispatch => {
    dispatch({
        type: CRUD_SET_IMAGE_RECORD,
        payload: record
    });
};