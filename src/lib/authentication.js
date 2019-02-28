import AmazonCognitoIdentity from "amazon-cognito-identity-js";
/* the user pool for registration and login operations */
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
	UserPoolId: process.env.REACT_APP_USER_POOL_ID,
	ClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID
});

export default class Authentication {
	constructor(){
		this.cognitoUser = null;
	}
	/**
	 * Sign up user to serverless user pool.
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
			/* sign up user */
			userPool.signUp(username, password, cognitoAttributes, null, function (err, result) {
				if (err) {
					reject(err);
				}else{
					/* set the user */
					this.cognitoUser = result.user;
					console.log("result for sign up:", result);
					resolve(result.user);
				}
			});
		});
	}
	/**
	 * Sign in user to serverless user pool.
	 * @param {String} username
	 * @param {String} password
	 */
	signIn(username, password) {
		return new Promise((resolve, reject) => {
			/* the authentication details */
			let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
				Username: username,
				Password: password
			});
			let userData = {
				Username: username,
				Pool: userPool
			};
			let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
			/* sign in this user to the pool */
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: function (result) {
					/* set the user */
					this.cognitoUser = cognitoUser;
					console.log("result for authentication", result);
					/* resolve authentication credentials */
					resolve({
						accessToken: result.getAccessToken().getJwtToken(),
						idToken: esult.getIdToken().getJwtToken(),
						refreshToken: result.getRefreshToken().getToken()
					});
				},
				onFailure: function (err) {
					reject(err);
				}
			});
		});
	}
	/**
	 * Resend confirmation code to user email.
	 */
	resendConfirmation(){
		return new Promise((resolve, reject)=>{
			this.cognitoUser.resendConfirmationCode(function (err, result) {
				if (err) {
					reject(err);
				}else{
					console.log("result from resend confirm registration", result);
					resolve(result);
				}
			});
		});
	}
	/**
	 * Validate using sign up using code.
	 * 
	 * @param {String} code 
	 */
	confirmRegistration (code){
		return new Promise((resolve, reject) => {
			this.cognitoUser.confirmRegistration(code, true, function (err, result) {
				if (err) {
					reject(err);
				} else {
					console.log("result from resend confirm registration", result);
					resolve(result);
				}
			});
		});
	}
}
