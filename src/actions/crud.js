import {
    CRUD_SWITCH_MODAL_VISIBILITY,
    CRUD_SET_IMAGE_RECORD
} from "lib/types";

export const switchModalVisibility = (show) => dispatch => {
    dispatch({
        type: CRUD_SWITCH_MODAL_VISIBILITY,
        payload: show
    });
};
export const setImageRecord = (record) => dispatch => {
    dispatch({
        type: CRUD_SET_IMAGE_RECORD,
        payload: record
    });
};