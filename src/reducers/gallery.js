import {
    GALLERY_SET_IMAGE_RECORDS
} from "lib/types";

const initialState = {
    records: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GALLERY_SET_IMAGE_RECORDS:
            return {
                ...state,
                records: action.payload
            }
        default:
            return state
    }
}