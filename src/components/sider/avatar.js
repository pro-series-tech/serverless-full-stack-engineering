
import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "actions/authentication";
import { Popconfirm, Icon, Avatar } from 'antd';

class AvatarSection extends Component {
    confirmSignOut = (e)=> {
        this.props.signOut();
    }
    render() {
        return (
            <div style={styles.avatarDiv}>
                <Avatar size={64} icon="user" />
                <br /> <br />
                <Popconfirm 
                    placement="bottomLeft"
                    title="Are you sure you want to sign out?" 
                    onConfirm={this.confirmSignOut} 
                    okText="Yes" 
                    cancelText="No"
                >
                    <a>Sign Out</a>
                </Popconfirm>
            </div>
        )
    }
}
const styles = {
    avatarDiv: {
        padding: '5px',
        textAlign: 'center'
    }
};
const mapStateToProps = (state, ownProps) => {
    return {
        credentials: state.authentication.credentials
    };
};
const mapDispatchToProps = {
    signOut
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvatarSection);