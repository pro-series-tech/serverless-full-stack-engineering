import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp} from "actions/authentication";
import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';

class SignUp extends Component {
	state = {
		confirmDirty: false
	};
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				let result = await this.props.signUp(values.userName, values.password);
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
