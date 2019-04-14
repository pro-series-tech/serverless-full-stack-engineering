/**
 * This script exports the Template component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from "react";
import { connect } from "react-redux";
/* local imports */
import { myAction } from "actions/actionsTemplate";
/* this component initial state */
const initialState = {
	stateMessage: "hello world",
	counter: 0
};
class MyComponent extends Component {
    /* set the instance initial state as initialState clone */
    state = {...initialState}
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
	/**
	 * Handles the redux action trigger.
	 */
	handleReduxClick = () => {
		this.props.myAction(new Date());
	};
    /**
     * Renders the template component.
     * @returns {React.Component}
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
		fontSize: 48,
		color: "red",
		height: '100%',
		paddingTop: '15%',
		textAlign: 'center',
		background: "black"
	}
};
/* map the redux state values to component properties */
const mapStateToProps = (state, ownProps) => {
	return {
		myDate: state.myReducer.myDate,
		propMessage: ownProps.ownMessage
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
