import { 
    CRUD_SWITCH_MODAL_VISIBILITY,
    CRUD_SET_IMAGE_RECORD
} from 'lib/types';

const initialState = {
    imageRecord: null,
    modalVisible: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CRUD_SWITCH_MODAL_VISIBILITY:
            return {
                ...state,
                modalVisible: action.payload
            }
        case CRUD_SET_IMAGE_RECORD:
            return {
                ...state,
                imageRecord: action.payload
            }
        default:
            return state
    }
}