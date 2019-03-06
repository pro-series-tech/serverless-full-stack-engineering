import React, { Component } from "react";
import { connect } from "react-redux";
import { SignIn, SignUp } from "components/authentication";
import { Row, Col } from 'antd';

class Landing extends Component {

    render() {
        return (
            <Row type="flex" align="middle" style={styles.row}>
                <Col xs={2} sm={4} md={6} lg={9} xl={9}></Col>
                <Col xs={20} sm={16} md={12} lg={6} xl={6} style={styles.col}>
                    <SignUp/>
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
        username: state.authentication.username
    };
};
const mapDispatchToProps = {
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing);
