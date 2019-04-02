
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from 'actions/authentication';
import HomeLayout from './home';
import LandingLayout from './landing';

class Layout extends Component {
    componentWillMount(){
        this.props.signIn();
    }
    render() {
        if (!this.props.credentials){
            return <LandingLayout/>
        }else{
            return <HomeLayout/>
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        credentials: state.authentication.credentials
    };
};
const mapDispatchToProps = {
    signIn
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);