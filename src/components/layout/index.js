
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeLayout from "./home";
import LandingLayout from "./landing";

class Layout extends Component {
    render() {
        if (!this.props.user){
            return <LandingLayout/>
        }else{
            return <HomeLayout/>
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.authentication.user
    };
};
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);