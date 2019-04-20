/**
 * This script exports the Sign In component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
/* local imports */
import { signIn, setUsername} from 'actions/authentication';
import { switchAuthenticationForm} from 'actions/global';
import {
	NAVIGATION_AUTHENTICATION_SIGN_UP,
	NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
	NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT
} from 'lib/types';
/* component initial state constant */
const initialState = {}
class SignIn extends Component {
	/* set the instance initial state as initialState clone */
	state = {...initialState}
	/**
	 * Handles the sign in submission
	 * @param  {Event} e
	 */
	handleSubmit = (e) => {
		/* cancel the form submission, we want to login manually instead */
		e.preventDefault();
		/* switch on loading spin on parent component */
		this.props.switchLoading(true);
		/* validate fields */
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				/* try to sign in asynchronously, if success, undefined is returned, otherwise 
				a string message is returned. */
				let error = await this.props.signIn(values.userName, values.password);
				/* if there was an error, call helper function */
				if (error){
					this.evaluateSignInResult(error, values);
				}
			}
			/* dissable loading UI */
			this.props.switchLoading(false);
		});
	}
	/**
	 * Helper function to display any error of sign in operation.
	 * @param  {string} error
	 * @param  {Object} values
	 */
	evaluateSignInResult = (error, values) =>{
		/* determine the error by evaluating true conditions. */
		switch (true) {
			/* the account is not yet confirmed, switch to confirm account form */
			case error.includes('not confirmed'):
				this.props.setUsername(values.userName);
				this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT);
				break;
			/* there was another error, display error message in password field */
			default:
				this.props.form.setFields({
					password: {
						value: values.password,
						errors: [new Error(error)]
					}
				});
		}
	}
    /**
     * Renders the sign in form component.
     * @returns {React.Component}
     */
	render(){
		/* get Ant design form field decorator function for this form */
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} >
				<Form.Item>
					{/* wrap input into a form field to enter username */}
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type='user' style={styles.field} />} placeholder='Username' />
					)}
				</Form.Item>
				<Form.Item>
					{/* wrap input into a form field to enter password */}
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type='lock' style={styles.field} />} type='password' placeholder='Password' />
					)}
				</Form.Item>
				<Form.Item>
					{/* render the forgot password link. clicking will switch to the forgot password form. */}
					<a 
					href="#/"
					onClick={() => {
						this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD);
					}}>Forgot Password</a>
				</Form.Item>
				<Form.Item>
					{/* render sign in button, when clicked, an attempt to sing in will executed */}
					<Button type='primary' htmlType='submit' className='login-form-button'>
						Sign In
         			 </Button>
					<hr/>
					{/* Render switch to sign up link */}
					<a 
					href="#/"
					onClick={()=>{
						this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_UP);
					}}>Create Account</a>
				</Form.Item>
			</Form>
		)
	}
}
/* component styles */
const styles = {
	field: {
		color: 'gray'
	}
};
/* wrap the form before passing it out to redux connect */
const WrappeSignInForm = Form.create({ name: 'normal_login' })(SignIn);
/* PropTypes for data type validation */
WrappeSignInForm.propTypes = {
	switchLoading: PropTypes.func,
	username: PropTypes.string
}
/* redux map state to properties */
const mapStateToProps = (state, ownProps) => {
	return {
		switchLoading: ownProps.switchLoading,
		username: state.authentication.username
	};
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = { 
	signIn,
	setUsername,
	switchAuthenticationForm
};
/* wrap this component into a redux component */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeSignInForm);
