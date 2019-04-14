/**
 * This script exports the Sign Up component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
/* local imports */
import { signUp} from 'actions/authentication';
import { switchAuthenticationForm } from 'actions/global';
import {
	NAVIGATION_AUTHENTICATION_SIGN_IN,
	AUTHENTICATION_INVALID_PWD_MSG,
	AUTHENTICATION_PWD_VALIDATION_REGEX
} from 'lib/types';
/* component initial state constant */
const initialState = {
	confirmDirty: false
}
class SignUp extends Component {
	/* set the instance initial state as initialState clone */
	state = {...initialState}
	/**
	 * Handles the blur input event used to set the form dirty flag into local
	 * state.
	 * @param  {Event} e
	 */
	handleConfirmBlur = (e) => {
		/* get the value from the target of the blur event, i.e. the input textbox*/
		const {value} = e.target;
				/* set the state of the component to dirty if is already dirty or value is not empty */
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	/**
	 * Matches password with confirm password input field.
	 * @param  {Object} rule
	 * @param  {string} value
	 * @param  {Function} callback
	 */
	validateToNextPassword = (rule, value, callback) => {
		/* get the form object from properties */
		const {form} = this.props;
		/* if the value is not empty and has change, force validation */
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		/* if the value does not match the regular expression validation, show error message */
		if (value && !AUTHENTICATION_PWD_VALIDATION_REGEX.test(value)){
			callback(AUTHENTICATION_INVALID_PWD_MSG);
		}else{
			callback();
		}
	}
	/**
	 * Matches confirm password with password input field.
	 * @param  {Object} rule
	 * @param  {string} value
	 * @param  {Function} callback
	 */
	compareToFirstPassword = (rule, value, callback) => {
		/* get the form object from properties */
		const form = this.props.form;
		/* if passwords input fields don't match, show error */
		if (value && value !== form.getFieldValue('password')) {
			/* invoke callback with error message */
			callback('Two passwords that you enter is inconsistent!');
		} else {
			/* everything is ok, just invoke the callback without arguments */
			callback();
		}
	}
	/**
	 * Handles the sign up submission
	 * @param  {Event} e
	 */
	handleSubmit = (e) => {
		e.preventDefault();
		/* switch on loading spin on parent component */
		this.props.switchLoading(true);
		/* validate fields */
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				/* try to sign up asynchronously, if success, undefined is returned, otherwise 
				a string message is returned. */
				let error = await this.props.signUp(values.userName, values.email, values.password);
				/* if there was an error, and is type is not confirmed */
				if(error){
					/* display error message in username input field */
					this.props.form.setFields({
						userName: {
							value: values.userName,
							errors: [new Error(error)]
						},
					});
				}
			}
			/* dissable loading */
			this.props.switchLoading(false);
		});
	}
    /**
     * Renders the sign up form component.
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
					{/* wrap input into a form field to enter email */}
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: 'The input is not valid E-mail!',
						}, {
							required: true, message: 'Please input your E-mail!',
						}],
					})(
						<Input prefix={<Icon type='mail' style={styles.field} />} placeholder='Email' />
					)}
				</Form.Item>
				<Form.Item>
					{/* wrap input into a form field to enter password */}
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' 
						},{
								validator: this.validateToNextPassword,
						}
					]})(
						<Input prefix={<Icon type='lock' style={styles.field} />} type='password' placeholder='Password' />
					)}
				</Form.Item>
				<Form.Item>
					{/* wrap input into a form field to enter confirm password */}
					{getFieldDecorator('confirm', {
						rules: [{
							required: true, message: 'Please confirm your password!',
						}, {
							validator: this.compareToFirstPassword,
						}],
					})(
						<Input prefix={<Icon type='lock' style={styles.field} />} type='password' placeholder='Confirm Password' onBlur={this.handleConfirmBlur} />
					)}
				</Form.Item>
				<Form.Item>
					{/* Render the Sign Up button */}
					<Button type='primary' htmlType='submit' className='login-form-button'>
						Sign Up
         			 </Button>
					<hr/>
					{/* Render switch to sign in link */}
					<a 
					href="#/"
					onClick={() => {
						this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
					}}>Sign In Instead</a>
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
const WrappeSignUpForm = Form.create({ name: 'normal_login' })(SignUp);
/* redux map state to properties */
const mapStateToProps = (state, ownProps) => {
	return {
		switchLoading: ownProps.switchLoading,
		username: state.authentication.username
	};
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = { 
	signUp,
	switchAuthenticationForm
};
/* wrap this component into a redux component */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeSignUpForm);
