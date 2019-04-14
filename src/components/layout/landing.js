/**
 * This script exports Landing layout component which renders one of the authentication components.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin } from 'antd';
/* local imports */
import { 
    SignIn, 
    SignUp, 
    ForgotPwd, 
    ConfirmAccount 
} from 'components/authentication';
import logoSrc from 'media/logo.svg';
import {
    NAVIGATION_AUTHENTICATION_SIGN_IN,
    NAVIGATION_AUTHENTICATION_SIGN_UP,
    NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
    NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT
} from 'lib/types';
/* component initial state constant */
const initialState = {
    loading: false
};
class Landing extends Component {
    /* set the instance initial state as initialState clone */
    state = {...initialState}
    /**
     * Set the loading boolean to start the Spin ant component.
     * @param  {boolean} loading
     */
    switchLoading = (loading) =>{
        this.setState({
            loading
        });
    }
    /**
     * Renders the corresponding authentication form by
     * inspecting the authenticationForm property coming from
     * the globa state.
     */
    renderAuthForm = () =>{
        /* get the current showing form from properties */
        let { authenticationForm } = this.props;
        /* determine which form to render. Note that we pass the function 'switchLoading' to
        each one of the components in order to turn ON and OFF the loading UI from inside
        the rendered component, meaning that invoking the function from inside
        the component will change the 'loading' state value of this parent component. */
        switch (authenticationForm){
            case NAVIGATION_AUTHENTICATION_SIGN_IN:
                return <SignIn switchLoading={this.switchLoading}/>;
            case NAVIGATION_AUTHENTICATION_SIGN_UP:
                return <SignUp switchLoading={this.switchLoading}/>
            case NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD:
                return <ForgotPwd switchLoading={this.switchLoading}/>
            case NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT:
                return <ConfirmAccount switchLoading={this.switchLoading}/>
                /* if a form is not recognized, throw error, this will be useful
                when a new form is declared but no Case to render is declared. It will 
                alert the developer why the form is not showing */
            default:
                throw new Error(`Unknown authentication form ${authenticationForm}`);
        }
    }
	/**
	 * Renders the landing component which will in turn render the corresponding
     * authentication components(sign in, sign up, forgot password, or confirm account)
	 * @returns {React.Component}
	 */
    render() {
        return (
            /* render a row with elements align in the middle of container */
            <Row type='flex' align='middle' style={styles.row}>
                {/* render columns with different width space allocations depending on 
                availablespace(or screen resolution).

                For example(first Col below), the total screen width has 24 units(100%).
                when the screen is xs(x small), will take 2 units of the width of this row.
                When the screen is sm(small) will take 4 units of the width of this row.
                When the screen is md(medium) will take 6 units of the width of this row.
                When the screen is lg(large) will take 9 units of the width of this row.
                When the screen is xl(x large) will take 9 units of the width of this row.
                
                The total allocation between each size of all columns must sum up 24. Note
                that the first Col xs: 2, second Col xs: 20, third Col xs: 2. In a small screen
                this will render one 2 units column, one 20 units column and another 2
                units column(left to right), where 24 units is 100% the width of the 
                available space.
                */}
                <Col xs={2} sm={4} md={6} lg={9} xl={9}></Col>
                <Col xs={20} sm={16} md={12} lg={6} xl={6} style={styles.col}>
                    {/* wrap the content of the form into the Spin component which
                    will block the UI when local state loading is set to True */}
                    <Spin spinning={this.state.loading}>
                        {/* render application logo */}
                        <img style={styles.logo} src={logoSrc} alt='logo'/>
                        {/*  */}
                        {this.renderAuthForm()}
                    </Spin>
                </Col>
                <Col xs={2} sm={4} md={6} lg={9} xl={9}></Col>
            </Row>
        )
    }
}
/* component styles */
const styles = {
    logo:{
        width: 150,
        marginBottom: 15,
        userSelect: 'none',
        pointerEvents: 'none'
    },
    row:{
        height: '100%'
    },
    col: {
        textAlign: 'center'
    }
};
/* wrap the form before passing it out to redux connect */
const mapStateToProps = (state, ownProps) => {
    return {
        authenticationForm: state.global.authenticationForm
    };
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = {};
/* wrap this component into a redux component */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing);
