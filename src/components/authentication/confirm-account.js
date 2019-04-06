/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
/* local imports */
import { confirmRegistration, resendConfirmation} from 'actions/authentication';
import { switchAuthenticationForm } from 'actions/global';
import { NAVIGATION_AUTHENTICATION_SIGN_IN } from 'lib/types';
/* component initial state constant */
const initialState = {}
/* the component class */
class ConfirmAccount extends Component {
	/* set the instance initial state as initialState clone */
	state = {...initialState}
	/**
	 * Confirm user registration when button is clicked.
	 *  @async
	 */
	resendConfirmationCode = async () =>{
		/* send confirmation code and wait for result(error if return a string) */
		const error = await this.props.resendConfirmation(this.props.username);
		/* confirmation code message */
		const msg = `Confirmation code send! please check your email.`;
		/* show the send message outcome as error in the code field */
		this.props.form.setFields({
			code: {
				errors: [new Error(error || msg)]
			}
		});
	}
	/**
	 * Confirm user registration when button is clicked.
	 *  @async
	 */
	confirmRegistrationCode = async () =>{
		/* get this form from the properties */
		const form = this.props.form;
		/* validate form rields */
		form.validateFields(async (err, values) => {
			/* if no error, proceed to confirm registration */
			if (!err) {
				/* confirm registration with serverless user base backend */
				let error = await this.props.confirmRegistration(this.props.username, values.code);
				/* if there was an error confirming the registration, set
				error message as code input error message */
				if(error){
					this.props.form.setFields({
						code: {
							value: values.code,
							errors: [new Error(error)]
						}
					});
				/* if there is no error, switch to login form */
				}else{
					this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
				}
			}
		});
	}
    /**
     * Renders the avatar component.
     * @returns {React.Component}
     */
	render(){
		/* get Ant design form field decorator function for thsi form */
		const { getFieldDecorator } = this.props.form;
		return (<Form >
			<Form.Item>
				{/* wrap input into a form field to enter confirmation code */}
				{getFieldDecorator('code', {
					rules: [{ required: true, message: 'Please input your confirmation code!' }],
				})(
					<Input prefix={<Icon type='check-square' style={styles.field} />} placeholder='Confirmation Code' />
				)}
			</Form.Item>
			<Form.Item>
				{/* Button to confirm code */}
				<Button type='primary' onClick={this.confirmRegistrationCode} className='login-form-button'>
					Confirm Code for '{this.props.username}'
					</Button>
			</Form.Item>
			<Form.Item>
				{/* Resend confirmation button */}
				<Button type='default' onClick={this.resendConfirmationCode} className='login-form-button'>
					<Icon type='clock-circle' style={styles.field} />Resend Confirmation
					</Button>
			</Form.Item>
			<Form.Item>
				<hr />
				{/* Navigation link to sign in */}
				<a 
				href="#/"
				onClick={() => {
					this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
				}}>Sign In Instead</a>
			</Form.Item>
		</Form>)
	}
}
/* component styles */
const styles = {
	field: {
		color: 'gray'
	}
};
/* wrap the form before passing it out to redux connect */
const WrappeConfirmAccountForm = Form.create({ name: 'normal_login' })(ConfirmAccount);
/* redux map state to properties */
const mapStateToProps = (state, ownProps) => {
	return {
		username: state.authentication.username
	};
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = { 
	confirmRegistration,
	resendConfirmation,
	switchAuthenticationForm
};
/* wrap this component into a redux component */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeConfirmAccountForm);
