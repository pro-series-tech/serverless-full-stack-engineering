/**
 * This script exports the Index Layout component which renders either the home or
 * landing component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/* local imports */
import HomeLayout from './home';
import LandingLayout from './landing';
import { signIn } from 'actions/authentication';
/* component initial state constant */
const initialState = {};
class Layout extends Component {
    /* set the instance initial state as initialState clone */
    state = {...initialState}
    /**
     * When the component mounts, try to sign in by verifying the
     * local storage cache.
     */
    componentWillMount(){
        this.props.signIn();
    }
	/**
	 * Renders the entry component. This will switch between login landing
     * component or home component depending if the user is authenticated or not.
	 * @returns {React.Component}
	 */
    render() {
        /* if credentials are present, render home component,
        else render landing page for login, create account, etc. */
        if (this.props.credentials){
            return <HomeLayout/>
        }else{
            return <LandingLayout/>
        }
    }
}
/* wrap the form before passing it out to redux connect */
const mapStateToProps = (state, ownProps) => {
    return {
        credentials: state.authentication.credentials
    };
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = {
    signIn
};
/* wrap this component into a redux component */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);