/* external imports */
import AWS from 'aws-sdk';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
/* local imports */
import { 
	AWS_REGION,
	USER_POOL_ID, 
	IDENTITY_POOL_ID,
	USER_POOL_CLIENT_ID
} from 'lib/environment';
/* the user pool for registration and login operations */
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
	UserPoolId: USER_POOL_ID,
	ClientId: USER_POOL_CLIENT_ID
});
/**
 * Examples of Amazon Cognito Identity can be found at:
 * https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
 */
export default class Authentication {
	/**
	 * Build cognito user for given username.
	 * @param  {string} username
	 * @returns  {CognitoUser}} Instance of cognito user.
	 */
	getCognitoUser = (username) => {
		/* otherwise return current user in session */
		return new AmazonCognitoIdentity.CognitoUser({
			Username: username,
			Pool: userPool
		});
	}
	/**
	 * Build cognito credentials for the given token.
	 * @param  {string} token
	 * @returns {CognitoIdentityCredentials} Cognito credentials object.
	 */
	getAWSCredentials = async (token)=>{
		/* set aws region */
		AWS.config.region = AWS_REGION;
		/* build the login url */
		let loginUrl = `cognito-idp.${AWS_REGION}.amazonaws.com/${USER_POOL_ID}`;
		/* create credentials object */
		let credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: IDENTITY_POOL_ID,
			Logins: {
				[loginUrl]: token
			}
		});
		/* clear cached credentials first */
		credentials.clearCachedId();
		/* get all user credentials */
		await credentials.getPromise();
		/* return async credentials */
		return credentials;
	}
	/**
	 * Get cached user if present.
	 * @returns {Promise} promise resolve the credentials of cached user.
	 */
	getCachedUser = () =>{
		return new Promise((resolve, reject) => {
			let user = userPool.getCurrentUser();
			if (user != null) {
				user.getSession(async (err, session)=> {
					if (err) {
						reject();
					} else if (session.isValid()){
						let token = session.getIdToken().getJwtToken();
						let credentials = await this.getAWSCredentials(token);
						resolve(credentials);
					}else{
						resolve();
					}
				});
			}else{
				resolve();
			}
		});
	}
	/**
	 * Sign up user to serverless user pool.
	 * @param {string} username
	 * @param {string} password
	 * @param {string[]} attributes
	 * @returns {Promise} promise resolving the username.
	 */
	signUp = (username, password, attributes) => {
		return new Promise((resolve, reject) => {
			/* convert all attributes to cognito attributes */
			let cognitoAttributes = attributes.map(a => {
				return new AmazonCognitoIdentity.CognitoUserAttribute(a);
			});
			/* sign up user */
			userPool.signUp(username, password, cognitoAttributes, null, (err, result)=> {
				if (err) {
					reject(err);
				}else{
					/* resolve */
					resolve(username);
				}
			});
		});
	}
	/**
	 * Sign in user to serverless user pool.
	 * @param {String} username
	 * @param {String} password
	 * @returns {promise} promise resolving credentials.
	 */
	signIn = (username, password) => {
		return new Promise(async (resolve, reject) => {
			/* try to login if cached user first */
			let credentials = await this.getCachedUser();
			/* if user is valid */
			if (credentials){
				resolve(credentials);
				return;
			}else if(!username || !password){
				reject('No user cached and no credentials provided');
				return;
			}
			/* the authentication details */
			let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
				Username: username,
				Password: password
			});
			let cognitoUser = this.getCognitoUser(username);
			/* sign in this user to the pool */
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: async (result) => {
					/* resolve authentication credentials */
					let token = result.getIdToken().getJwtToken();
					let credentials = await this.getAWSCredentials(token);
					resolve(credentials);
				},
				onFailure: reject
			});
		});
	}
	
	/**
	 * Sign out user and clears all tokens.
	 */
	signOut = async () => {
		/* get cached user */
		let cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null) {
			/* sign out and clear local storage */
			cognitoUser.signOut();
		}
	}
	/**
	 * 	Resend confirmation code to user email.
	 * @param {String} username 
	 * @returns {Promise} Resolves or rejects confirmation async operation.
	 */
	resendConfirmation = (username) => {
		let cognitoUser = this.getCognitoUser(username);
		return new Promise((resolve, reject)=>{
			cognitoUser.resendConfirmationCode((err, result) => {
				(err) ? reject(err) : resolve(result);
			});
		});
	}
	/**
	 * Confirms registration using username and email provided code.
	 * @param {String} username 
	 * @param {String} code 
	 * @returns {Promise} Resolves or rejects account confirmation.
	 */
	confirmRegistration = (username, code) => {
		let cognitoUser = this.getCognitoUser(username);
		return new Promise((resolve, reject) => {
			cognitoUser.confirmRegistration(code, true, (err, result)=> {
				(err) ? reject(err) : resolve(result);
			});
		});
	}
	/**
	 * Changes the user passsword for the given username.
	 * @param {String} username 
	 * @param {String} oldPassword 
	 * @param {String} newPassword 
	 * @returns {Promise} Resolves or rejects change password outcome.
	 */
	changePassword = (username, oldPassword, newPassword) => {
		let cognitoUser = this.getCognitoUser(username);
		return new Promise((resolve, reject) => {
			cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
				(err) ? reject(err) : resolve(result);
			});
		});
	}
	/**
	 * Sends the forgot password trigger to the backend.
	 * @param {String} username 
	 * @returns {Promise} Resolves or rejects forgot password outcome.
	 */
	forgotPassword = (username) => {
		let cognitoUser = this.getCognitoUser(username);
		return new Promise((resolve, reject) => {
			cognitoUser.forgotPassword({
				onSuccess: resolve, 
				onFailure: reject
			});
		});
	}
	/**
	 * @param {String} username
	 * @param {String} verificationCode
	 * @param {String} newPassword
	 */
	confirmPassword = (username, verificationCode, newPassword) => {
		let cognitoUser = this.getCognitoUser(username);
		return new Promise((resolve, reject) => {
			cognitoUser.confirmPassword(verificationCode, newPassword,{
				onSuccess: resolve,
				onFailure: reject
			});
		});
	}
}
