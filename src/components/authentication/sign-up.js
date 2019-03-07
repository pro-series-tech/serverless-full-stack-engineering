import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp} from "actions/authentication";
import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';

const pwdRegex  = /^(?=.*[0-9])(?=.*[!@#$%^&*\.])[a-zA-Z0-9!@#$%^&*\.]{8,16}$/;
const invalidPwdMsg = `
Password must follow:
8 to 16 characters long
, at least one number
, at least one special character: ! @ # $ % ^ & * .
, at least one uppercase letter
, and at least one lowercase letter.
`;

class SignUp extends Component {
	state = {
		confirmDirty: false
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
		if (value && !pwdRegex.test(value)){
			callback(invalidPwdMsg);
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
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				let error = await this.props.signUp(values.userName, values.email, values.password);
				if(error){
					/* show validation */
					this.props.form.setFields({
						userName: {
							value: values.userName,
							errors: [new Error(error)]
						},
					});
				}
			}
		});
	}
	render(){

		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} >
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={styles.field} />} placeholder="Username" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: 'The input is not valid E-mail!',
						}, {
							required: true, message: 'Please input your E-mail!',
						}],
					})(
						<Input prefix={<Icon type="mail" style={styles.field} />} placeholder="Email" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' 
						},{
								validator: this.validateToNextPassword,
						}
					]})(
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

					<Button type="primary" htmlType="submit" className="login-form-button">
						Sign Up
         			 </Button>
					<hr/>
					<a href="">Login Instead</a>
				</Form.Item>

			</Form>
		)
	}

}

const styles = {
	field: {
		color: 'gray'
	}
};

/* wrap the form before passing it out to redux connect */
const WrappeSignInForm = Form.create({ name: 'normal_login' })(SignUp);

const mapStateToProps = (state, ownProps) => {
	return {
		username: state.authentication.username
	};
};
const mapDispatchToProps = { 
	signUp
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeSignInForm);
