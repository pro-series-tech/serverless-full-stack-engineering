import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { List } from "immutable";

/* the user pool for registration and login operations */
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
	UserPoolId: process.env.REACT_APP_USER_POOL_ID,
	ClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID
});

/**
 * Class for application authentication
 */
export default class Authentication {
    /**
     * Sign up user to serverless user pool.
     * 
     * @param {String} username 
     * @param {String} password 
     * @param {String[]} attributes 
     */
	signUp(username, password, attributes) {
		return new Promise((resolve, reject) => {
            /* convert all attributes to cognito attributes */
			let cognitoAttributes = attributes.map(a => {
				return new AmazonCognitoIdentity.CognitoUserAttribute(a);
			});
		});
	}
}
