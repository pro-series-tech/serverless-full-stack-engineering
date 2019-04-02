import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmRegistration, resendConfirmation} from 'actions/authentication';
import { switchAuthenticationForm } from 'actions/global';
import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';
import {
	NAVIGATION_AUTHENTICATION_SIGN_IN,
} from 'lib/types';

class ConfirmAccount extends Component {
	resendConfirmationCode = async () =>{
		let error = await this.props.resendConfirmation(this.props.username);
		let msg = `Confirmation code send! please check your email.`;

		this.props.form.setFields({
			code: {
				errors: [new Error(error || msg)]
			}
		});
	}
	confirmRegistrationCode = async () =>{
		const form = this.props.form;
		form.validateFields(async (err, values) => {
			if (!err) {
				let error = await this.props.confirmRegistration(this.props.username, values.code);
				if(error){
					this.props.form.setFields({
						code: {
							value: values.code,
							errors: [new Error(error)]
						}
					});
				}else{
					this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
				}
			}
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (<Form >
			<Form.Item>
				{getFieldDecorator('code', {
					rules: [{ required: true, message: 'Please input your confirmation code!' }],
				})(
					<Input prefix={<Icon type='check-square' style={styles.field} />} placeholder='Confirmation Code' />
				)}
			</Form.Item>
			<Form.Item>
				<Button type='primary' onClick={this.confirmRegistrationCode} className='login-form-button'>
					Confirm Code for '{this.props.username}'
					</Button>
			</Form.Item>
			<Form.Item>
				<Button type='default' onClick={this.resendConfirmationCode} className='login-form-button'>
					<Icon type='clock-circle' style={styles.field} />Resend Confirmation
					</Button>
			</Form.Item>
			<Form.Item>
				<hr />
				<a onClick={() => {
					this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
				}}>Login Instead</a>
			</Form.Item>
		</Form>)
	}
}

const styles = {
	field: {
		color: 'gray'
	}
};

/* wrap the form before passing it out to redux connect */
const WrappeConfirmAccountForm = Form.create({ name: 'normal_login' })(ConfirmAccount);

const mapStateToProps = (state, ownProps) => {
	return {
		username: state.authentication.username
	};
};
const mapDispatchToProps = { 
	confirmRegistration,
	resendConfirmation,
	switchAuthenticationForm
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeConfirmAccountForm);
