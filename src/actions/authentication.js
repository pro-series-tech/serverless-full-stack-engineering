
import {
    AUTHENTICATE_SIGN_IN,
    AUTHENTICATE_SIGN_OUT,
    AUTHENTICATE_SIGN_UP
} from "lib/types";

import Authentication from "lib/authentication";

/* instantiate authentication object */
const auth = new Authentication();

export const signUp = (username, email, password) => async dispatch => {
    
    let attributes = [
        {
            Name: "email",
            Value: email
        }
    ];
    let result = await auth.signUp(username, password, attributes);
    
    // dispatch({
    //     type: AUTHENTICATE_SIGN_UP,
    //     payload: "someuser111"
    // });

    return result;
};

export const signIn = (username, password) => async dispatch => {};

export const signOut = () => async dispatch => {};

/*
let attributes = [
	{
		Name: "email",
		Value: "some.email@mail.com"
	},
	{
		Name: "phone_number",
		Value: "+11543344333"
	}
];

let result = await auth.signUp("some.email@mail.com", "SomePassword123..", attributes);
console.log("Results from sign up is:", result);

let result = await auth.signIn("some.email@mail.com", "SomePassword123..");
console.log("Sign in results:", result);

let result = await auth.resendConfirmation("some.email@mail.com");
console.log("Resend confirmation results:", result);

let result = await auth.confirmRegistration("some.email@mail.com", "091660");
console.log("Confirmation results:", result);
*/