
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions/authentication';
import { Popconfirm, Avatar, notification } from 'antd';
import { PICTURE_BUCKET } from 'lib/environment';
import ObjectStorage from 'lib/object-storage'

const initialState = {
    avatarUploadCount: 0
}
class AvatarSection extends Component {
    state = initialState;
    handleAvatarUpload = async(file) => {
        console.log('file read',)
        /* get the clients with fresh credentials */
        let objectStorageClient = new ObjectStorage(this.props.credentials);
        /* first we insert the picture */
        await objectStorageClient.putAvatarPictureFile(file);
        /* force re render  of avatar */
        this.setState({
            avatarUploadCount: this.state.avatarUploadCount + 1
        });
        /* dont hold the file */
        return false;
    }
    confirmSignOut = (e) => {
        this.props.signOut();
        /* show removal notification */
        notification.info({
            message: 'Signed Out Successfully',
            description: `You have been successfully signed out.`
        });
    }
    render() {
        const { identityId } = this.props.credentials;
        const avatarSrc = `https://s3.amazonaws.com/${PICTURE_BUCKET}/${identityId}/avatar.png?t=${Date.now()}`;
        return (
            <div style={styles.avatarDiv}>
                <Avatar 
                    style={styles.avatarPicture}
                    size={64} 
                    icon='user' 
                    src={avatarSrc}
                    onClick={()=>{this.fileUpload.click()}}
                />
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