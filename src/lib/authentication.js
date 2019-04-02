import AWS from 'aws-sdk';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { 
	USER_POOL_ID, 
	USER_POOL_CLIENT_ID, 
	IDENTITY_POOL_ID,
	AWS_REGION
} from "lib/environment";
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
	getCognitoUser = (username) => {
		/* otherwise return current user in session */
		return new AmazonCognitoIdentity.CognitoUser({
			Username: username,
			Pool: userPool
		});
	}
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
	 * @param {String} username
	 * @param {String} password
	 * @param {String[]} attributes
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
				reject("No user cached and no credentials provided");
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
				onFailure: (err) => {
					reject(err);
				}
			});
		});
	}
	/**
	 * Sign out user and clears all tokens
	 */
	signOut = (credentials) => {
		return new Promise((resolve, reject) => {
			/* get cached user */
			let cognitoUser = userPool.getCurrentUser();
			if (cognitoUser != null) {
				/* sign out and clear local storage */
				cognitoUser.signOut();
			}
			/* resolve the promise */
			resolve();
		});
	}
	/**
	 * 	Resend confirmation code to user email.
	 * @param {String} username 
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
	 * Validate using sign up using code.
	 * @param {String} username 
	 * @param {String} code 
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
	 * @param {String} username 
	 * @param {String} oldPassword 
	 * @param {String} newPassword 
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
	 * @param {String} username 
	 */
	forgotPassword = (username) => {
		let cognitoUser = this.getCognitoUser(username);
		return new Promise((resolve, reject) => {
			cognitoUser.forgotPassword({
				onSuccess: (result) => {
					/* resolve authentication credentials */
					resolve(result);
				}, 
				onFailure: (err) => {
					reject(err); 
				}
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
				onSuccess: (result) => {
					resolve(result);
				},
				onFailure: (err) => {
					reject(err);
				}
			});
		});
	}
}
