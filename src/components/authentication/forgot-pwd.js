import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword, confirmPassword} from 'actions/authentication';
import { switchAuthenticationForm } from 'actions/global';
import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';
import {
	NAVIGATION_AUTHENTICATION_SIGN_IN,
	AUTHENTICATION_INVALID_PWD_MSG,
	AUTHENTICATION_PWD_VALIDATION_REGEX
} from 'lib/types';

/* local enumerators for forgot password workflow */
const CODE_REQUEST_NOT_YET_SEND = 'CODE_REQUEST_NOT_YET_SEND';
const CODE_REQUEST_SEND = 'CODE_REQUEST_SEND';

class ForgotPwd extends Component {
	state = {
		confirmDirty: false,
		currentUsername: null,
		workflowStep: CODE_REQUEST_NOT_YET_SEND
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	validateToNextPassword = (rule, value, callback) => {
		const {form} = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		if (value && !AUTHENTICATION_PWD_VALIDATION_REGEX.test(value)){
			callback(AUTHENTICATION_INVALID_PWD_MSG);
		}else{
			callback();
		}
	}
	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	sendCodeRequest = async () =>{
		/* switch on loading spin on parent component */
		this.props.switchLoading(true);
		const { form } = this.props;
		form.validateFields(async (err, values) => {
			if (!err) {
				let username = form.getFieldValue('userName');
				let error = await this.props.forgotPassword(username);
				if(error){
					this.props.form.setFields({
						userName: {
							value: values.userName,
							errors: [new Error(error)]
						}
					});
				} else {
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
			<a onClick={() => {
				this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN);
			}}>Login Instead</a>
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
		switch (this.state.workflowStep) {
			case CODE_REQUEST_NOT_YET_SEND:
				return this.renderCodeRequestNotYetSendForm();
			case CODE_REQUEST_SEND:
				return this.renderChangePassword();
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
