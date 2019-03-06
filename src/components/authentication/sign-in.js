import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn} from "actions/authentication";
import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';

class SignIn extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				let result = await this.props.signIn(values.userName, values.password);
				console.log('Sign in result', result);
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
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={styles.field} />} type="password" placeholder="Password" />
					)}
					<a className="login-form-forgot" href="">Forgot Password</a>
				</Form.Item>
				<Form.Item>

					<Button type="primary" htmlType="submit" className="login-form-button">
						Sign In
         			 </Button>
					<br />
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember Me</Checkbox>
					)}
					<hr/>
					<a href="">Create Account</a>
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
const WrappeSignInForm = Form.create({ name: 'normal_login' })(SignIn);

const mapStateToProps = (state, ownProps) => {
	return {
		username: state.authentication.username
	};
};
const mapDispatchToProps = { 
	signIn
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeSignInForm);
