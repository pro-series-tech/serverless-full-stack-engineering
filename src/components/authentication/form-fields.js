import React, { Component } from "react";
import { connect } from "react-redux";
import {
    NAVIGATION_AUTHENTICATION_SIGN_IN
} from "lib/types";
import { switchAuthenticationForm } from "actions/global";

class formFields extends Component{
    LoginInstead = () =>{
        return (<a onClick={this.props.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN)} >Login Instead</a>);
    }
};

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = {
    switchAuthenticationForm
};
const connectedFormFields = connect(
    mapStateToProps,
    mapDispatchToProps
)(formFields);

const FFH = new connectedFormFields();

/* export components instance of class */
export const LoginInstead  = FFH.LoginInstead();