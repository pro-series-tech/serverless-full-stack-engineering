import React, { Component } from "react";
import { connect } from "react-redux";
import { SignIn, SignUp, ForgotPwd, ConfirmAccount } from "components/authentication";
import { Row, Col, Spin } from 'antd';
import {
    NAVIGATION_AUTHENTICATION_SIGN_IN,
    NAVIGATION_AUTHENTICATION_SIGN_UP,
    NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
    NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT
} from 'lib/types';

class Landing extends Component {
    state = { loading: false }
    switchLoading = (loading) =>{
        this.setState({
            loading
        });
    }
    determineAuthForm = () =>{
        switch (this.props.authenticationForm){
            case NAVIGATION_AUTHENTICATION_SIGN_IN:
                return <SignIn switchLoading={this.switchLoading}/>;
            case NAVIGATION_AUTHENTICATION_SIGN_UP:
                return <SignUp switchLoading={this.switchLoading}/>
            case NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD:
                return <ForgotPwd switchLoading={this.switchLoading}/>
            case NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT:
                return <ConfirmAccount switchLoading={this.switchLoading}/>
        }
    }
    render() {
        return (
            <Row type="flex" align="middle" style={styles.row}>
                <Col xs={2} sm={4} md={6} lg={9} xl={9}></Col>
                <Col xs={20} sm={16} md={12} lg={6} xl={6} style={styles.col}>
                    <Spin spinning={this.state.loading}>
                        {this.determineAuthForm()}
                    </Spin>
                </Col>
                <Col xs={2} sm={4} md={6} lg={9} xl={9}></Col>
            </Row>
        )
    }
}

const styles = {
    row:{
        height: "100%"
    },
    col: {
        textAlign: "center"
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        authenticationForm: state.global.authenticationForm
    };
};
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing);
