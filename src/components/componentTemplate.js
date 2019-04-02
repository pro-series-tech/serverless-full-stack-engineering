import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "antd";
import { myAction } from "actions/actionsTemplate";
/* this component initial state */
const initialState = {
	stateMessage: "hello world",
	counter: 0
};
/* react component class definition, extending react Component parent class */
class MyComponent extends Component {
	/* set the initial stae */
	state = initialState;
	/**
	 * Handles local state button onClick event.
	 */
	handleStateClick = () => {
		/* the increase the counter */
		let counter = this.state.counter + 1;
		let stateMessage = `Next counter is ${counter}`;
		/* increment the counter */
		this.setState({
			counter,
			stateMessage
		});
	};
	handleReduxClick = () => {
		this.props.myAction(new Date());
	};
	/**
	 * Renders the react component.
	 */
	render() {
		/* get the component properties and state using destructuring */
		let { stateMessage } = this.state;
		let { propMessage, myDate } = this.props;
		/* return JSX transpiled component */
		return (
			<div style={styles.div}>
				<button onClick={this.handleStateClick}>
					{stateMessage}, {propMessage}
				</button>
				<br/>
				<br/>
				<button onClick={this.handleReduxClick}> 
					{myDate.getTime()} 
				</button>
			</div>
		);
	}
}
/* define the component CSS styles */
const styles = {
	div: {
		paddingTop: '15%',
		textAlign: 'center',
		height: '100%',
		color: "red",
		background: "black",
		fontSize: 48
	}
};
/* map the redux state values to component properties */
const mapStateToProps = (state, ownProps) => {
	return {
		propMessage: ownProps.ownMessage,
		myDate: state.myReducer.myDate
	};
};
/* map the dispatching actions to component properties */
const mapDispatchToProps = {
	myAction
};
/* export the component wrapping it inn the Redux connect mechanism */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyComponent);
