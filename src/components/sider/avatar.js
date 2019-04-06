
/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popconfirm, Avatar, notification } from 'antd';
/* local imports */
import { signOut } from 'actions/authentication';
import ObjectStorage from 'lib/object-storage';
import { PICTURE_BUCKET } from 'lib/environment';
/* component initial state constant */
const initialState = {
    /* the avatar upload count is used to prevent caching
    of the avatar if reuploaded,i.e. will force the browser to
    fetch new image from backend */
    avatarUploadCount: 0
}
/* the component class */
class AvatarSection extends Component {
    /* set the instance initial state as initialState clone */
    state = {...initialState}
    /**
     * Upload input image file to serverless backend. Always returns false to prevent the ant design
     * file uploader from using the build in upload mechanism, i.e. we want to upload it manually.
     * @async
     * @param  {File} file
     * @returns {boolean}
     */
    handleAvatarUpload = async(file) => {
        /* get the clients with fresh credentials */
        let objectStorageClient = new ObjectStorage(this.props.credentials);
        /* first we insert the picture into the serverless backend asynchronously */
        await objectStorageClient.putAvatarPictureFile(file);
        /* force re render of avatar(invalidate cache) */
        this.setState({
            avatarUploadCount: this.state.avatarUploadCount + 1
        });
        /* dont hold the file */
        return false;
    }
    /**
     * Handle sign out event and show notification for user feedback.
     */
    confirmSignOut = () => {
        /* invoke sign out action */
        this.props.signOut();
        /* show removal notification */
        notification.info({
            message: 'Signed Out Successfully',
            description: `You have been successfully signed out.`
        });
    }
    /**
     * Renders the avatar component.
     * @returns {React.Component}
     */
    render() {
        /* get the current credential's identity ID */
        const { identityId } = this.props.credentials;
        /* build the avatar image URL using ES6 template literal */
        const avatarSrc = `https://s3.amazonaws.com/${PICTURE_BUCKET}/${identityId}/avatar.png?t=${Date.now()}`;
        /* return a component */
        return (
            /* The avatar container division */
            <div style={styles.avatarDiv}>
                {/* The avatar component */}
                <Avatar 
                    style={styles.avatarPicture}
                    size={64} 
                    icon='user' 
                    src={avatarSrc}
                    onClick={()=>{this.fileUpload.click()}}
                />
                {/* hidden input button to upload the avatar */}
                <input 
                    style={styles.fileUpload}
                    type='file' 
                    accept='.png'
                    ref={(r) => {
                        this.fileUpload = r;
                    }}
                    onChange={(e) => this.handleAvatarUpload(e.target.files[0])} 
                />
                <br />
                <br />
                {/* Pop Confirm to confirm user intent to sing out */}
                <Popconfirm 
                    placement='bottomLeft'
                    title='Are you sure you want to sign out?' 
                    onConfirm={this.confirmSignOut} 
                    okText='Yes' 
                    cancelText='No'
                >
                    <a href="#/">Sign Out</a>
                </Popconfirm>
            </div>
        )
    }
}
/* component styles */
const styles = {
    avatarDiv: {
        padding: '5px',
        textAlign: 'center'
    },
    avatarPicture:{
        marginTop: 10,
        cursor: 'pointer',
        border: 'white 2px solid'
    },
    fileUpload: {
        display: 'none'
    }
};
/* redux map state to properties */
const mapStateToProps = (state, ownProps) => {
    return {
        credentials: state.authentication.credentials
    };
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = {
    signOut
};
/* wrap this component into a redux component */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvatarSection);