import React, { Component } from "react";
import { connect } from "react-redux";
import { forgotPassword, confirmPassword} from "actions/authentication";
import { switchAuthenticationForm } from "actions/global";
import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';
import {
	NAVIGATION_AUTHENTICATION_SIGN_IN,
	AUTHENTICATION_INVALID_PWD_MSG,
	AUTHENTICATION_PWD_VALIDATION_REGEX
} from 'lib/types';

/* local enumerators for forgot password workflow */
const CODE_REQUEST_NOT_YET_SEND = "CODE_REQUEST_NOT_YET_SEND";
const CODE_REQUEST_SEND = "CODE_REQUEST_SEND";

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
		const form = this.props.form;
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
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	sendCodeRequest = async () =>{
		/* switch on loading spin on parent component */
		this.props.switchLoading(true);
		const form = this.props.form;
		form.validateFields(async (err, values) => {
			if (!err) {
				let username = form.getFieldValue('username');
				let result = await this.props.forgotPassword(username);
				console.log("result is", result);
			}
			/* dissable loading */
			this.props.switchLoading(false);
		});
	}
	confirmPassword = () =>{
		/* TODO: implement confirm password body */
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
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={styles.field} />} placeholder="Username" />
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" onClick={this.sendCodeRequest} className="login-form-button">
						Send Forgot Request Email
					</Button>
				</Form.Item>
				{this.renderGoToSignInLink()}
			</Form>
		)
	}
	renderCodeRequestSend = () => {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form >
				<Form.Item>
					{getFieldDecorator('userName', {})(
						<Input enable prefix={<Icon type="user" style={styles.field} />} disabled={true} defaultValue={this.state.currentUsername}/>
					)}
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
						<Input prefix={<Icon type="lock" style={styles.field} />} type="password" placeholder="Password" />
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
						<Input prefix={<Icon type="lock" style={styles.field} />} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" onClick={this.confirmPassword} className="login-form-button">
						Change Password
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
				return this.renderCodeRequestSend();
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
