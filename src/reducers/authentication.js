import { 
    AUTHENTICATION_SIGN_IN,
    AUTHENTICATION_SIGN_OUT,
    AUTHENTICATION_SIGN_UP
} from "lib/types";

const initialState = {
    username: "someuser",
    email: "",
    password: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_SIGN_UP:
            return {
                ...state,
                username: action.payload
            }
        case AUTHENTICATION_SIGN_IN:
            return {
                ...state
            }
        case AUTHENTICATION_SIGN_OUT:
            return {
                ...state
            }
        default:
            return state
    }
}