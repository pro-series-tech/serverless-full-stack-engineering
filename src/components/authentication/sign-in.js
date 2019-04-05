import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, setUsername} from 'actions/authentication';
import { switchAuthenticationForm} from 'actions/global';
import {
	NAVIGATION_AUTHENTICATION_SIGN_UP,
	NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
	NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT
} from 'lib/types';
import {
	Form, Icon, Input, Button
} from 'antd';

class SignIn extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		/* switch on loading spin on parent component */
		this.props.switchLoading(true);
		/* validate fields */
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				let error = await this.props.signIn(values.userName, values.password);
				/* if there was an error, and is type is not confirmed */
				if (error){
					this.evaluateSignInResult(error, values);
				}
			}
			/* dissable loading */
			this.props.switchLoading(false);
		});
	}
	evaluateSignInResult = (error, values) =>{
		switch (true) {
			case error.includes('not confirmed'):
				this.props.setUsername(values.userName);
				this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT);
				break;
			default:
				this.props.form.setFields({
					password: {
						value: values.password,
						errors: [new Error(error)]
					}
				});
		}
	}
	render(){
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit} >
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type='user' style={styles.field} />} placeholder='Username' />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type='lock' style={styles.field} />} type='password' placeholder='Password' />
					)}
				</Form.Item>
				<Form.Item>
					<a 
					href="#\"
					onClick={() => {
						this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD);
					}}>Forgot Password</a>
				</Form.Item>
				<Form.Item>

					<Button type='primary' htmlType='submit' className='login-form-button'>
						Sign In
         			 </Button>
					<hr/>
					<a 
					href="#\"
					onClick={()=>{
						this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_UP);
					}}>Create Account</a>
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
		switchLoading: ownProps.switchLoading,
		username: state.authentication.username
	};
};
const mapDispatchToProps = { 
	signIn,
	setUsername,
	switchAuthenticationForm
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WrappeSignInForm);
