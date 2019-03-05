import { 
    AUTHENTICATE_SIGN_IN,
    AUTHENTICATE_SIGN_OUT,
    AUTHENTICATE_SIGN_UP
} from "lib/types";

const initialState = {
    username: "someuser",
    email: "",
    password: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_SIGN_UP:
            return {
                ...state,
                username: action.payload
            }
        case AUTHENTICATE_SIGN_IN:
            return {
                ...state
            }
        case AUTHENTICATE_SIGN_OUT:
            return {
                ...state
            }
        default:
            return state
    }
}