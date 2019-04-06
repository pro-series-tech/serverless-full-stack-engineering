/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
/* local imports */
import { forgotPassword, confirmPassword} from 'actions/authentication';
import { switchAuthenticationForm } from 'actions/global';
import {
	NAVIGATION_AUTHENTICATION_SIGN_IN,
	AUTHENTICATION_INVALID_PWD_MSG,
	AUTHENTICATION_PWD_VALIDATION_REGEX
} from 'lib/types';

/* local constants for forgot password workflow */
const CODE_REQUEST_NOT_YET_SEND = 'CODE_REQUEST_NOT_YET_SEND';
const CODE_REQUEST_SEND = 'CODE_REQUEST_SEND';
/* component initial state constant */
const initialState = {
	confirmDirty: false,
	currentUsername: null,
	workflowStep: CODE_REQUEST_NOT_YET_SEND
}
class ForgotPwd extends Component {
	/* set the instance initial state as initialState clone */
	state = {...initialState}
	/**
	 * Triggers the change on the form, i.e. set to dirty.
	 * @param  {FocusEvent} e
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
			/* invoke callback with error message, meaning it does not match regex rules */
			callback(AUTHENTICATION_INVALID_PWD_MSG);
		}else{
			/* everything is ok, just invoke the callback without arguments */
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
		const { form } = this.props;
		/* if passwords input fields don't match, show error */
		if (value && value !== form.getFieldValue('password')) {
			/* invoke callback with error message */
			callback(`The two passwords don't match!`);
		} else {
			/* everything is ok, just invoke the callback without arguments */
			callback();
		}
	}
	/**
	 * Send code request in order to change password. By sending a code to user's email
	 * we validate that is its actually the legitimate owner of the account.
	 * @async
	 */
	sendCodeRequest = async () =>{
		/* switch on loading spin on parent component */
		this.props.switchLoading(true);
		/* get this form from the properties */
		const { form } = this.props;
		/* validate fields before trying to send code */
		form.validateFields(async (err, values) => {
						/* if no error, proceed to send code */
			if (!err) {
				/* get current username in username field */
				let username = form.getFieldValue('userName');
				/* send code using forgot password async function */
				let error = await this.props.forgotPassword(username);
				/* if there was an error sending the code, set
				error message as username input error message */
				if(error){
					this.props.form.setFields({
						userName: {
							value: values.userName,
							errors: [new Error(error)]
						}
					});
				} else {
					/* if code was send, set the current username in the state, and
					switch to the next step of the workflow using local component state */
					this.setState({
						currentUsername: username,
						workflowStep: CODE_REQUEST_SEND
					});
				}
			}
			/* dissable loading */
			this.props.switchLoading(false);
		});
	}
	confirmPassword = () =>{
		/* switch on loading spin on parent component */
		this.props.switchLoading(true);
		const { form } = this.props;
		form.validateFields(async (err, values) => {
			if (!err) {
				let username = this.state.currentUsername;
				let password = form.getFieldValue('password');
				let code = form.getFieldValue('codeNumber');
				let error = await this.props.confirmPassword(username, code, password);
				if (error) {
					this.props.form.setFields({
						codeNumber: {
							value: values.codeNumber,
							errors: [new Error(error)]
						}
					});
				} else {
					this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
				}
			}
			/* dissable loading */
			this.props.switchLoading(false);
		});
	}
	renderGoToSignInLink = () =>{
		return (<Form.Item>
			<hr />
			<a 
				href="#/"
				onClick={() => {
				this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
			}}>
			Login Instead</a>
		</Form.Item>)
	}
	renderCodeRequestNotYetSendForm = () => {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form >
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type='user' style={styles.field} />} placeholder='Username' />
					)}
				</Form.Item>
				<Form.Item>
					<Button type='primary' onClick={this.sendCodeRequest} className='login-form-button'>
						Send Forgot Request Email
					</Button>
				</Form.Item>
				{this.renderGoToSignInLink()}
			</Form>
		)
	}
	renderChangePassword = () => {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form >
				<Form.Item>
					<Input prefix={<Icon type='user' style={styles.field} />} disabled value={this.state.currentUsername}/>
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{
							required: true, message: 'Please input your Password!'
						}, {
							validator: this.validateToNextPassword,
						}
						]
					})(
						<Input prefix={<Icon type='lock' style={styles.field} />} type='password' placeholder='Password' />
					)}
				</Form.Item>
				<Form.Item>
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
					{getFieldDecorator('codeNumber', {
						rules: [{ required: true, message: 'Please enter code number send to your email!' }],
					})(
						<Input prefix={<Icon type='number' style={styles.field} />} placeholder='Code' />
					)}
				</Form.Item>
				<Form.Item>
					<Button type='primary' onClick={this.confirmPassword} className='login-form-button'>
						Confirm Password
					</Button>
				</Form.Item>
				{this.renderGoToSignInLink()}
			</Form>
		)
	}
	render(){
		let {workflowStep} = this.state;
		switch (workflowStep) {
			case CODE_REQUEST_NOT_YET_SEND:
				return this.renderCodeRequestNotYetSendForm();
			case CODE_REQUEST_SEND:
				return this.renderChangePassword();
			default:
				throw new Error(`Unknown workflow step ${workflowStep}`);
		}
	}
}

const styles = {
	field: {
		color: 'gray'
	}
};

/* wrap the form before passing it out to redux connect */
const WrappeForgotPasswordForm = Form.create({ name: 'normal_login' })(ForgotPwd);

const mapStateToProps = (state, ownProps) => {
	return {};
};
const mapDispatchToProps = { 
	forgotPassword,
	confirmPassword,
	switchAuthenticationForm
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeForgotPasswordForm);
