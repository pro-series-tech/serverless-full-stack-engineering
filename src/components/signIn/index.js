import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signUp} from "actions/authentication";

class SignIn extends Component {

	render(){
		return(
			<div>
				{this.props.username}
				<button onClick={(evt)=>{
					this.props.signUp();
				}} >sign in</button>
			</div>
		)
	}

}

const mapStateToProps = (state, ownProps) => {
	return {
		username: state.authentication.username
	};
};
const mapDispatchToProps = { 
	signIn,
	signUp
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn);
