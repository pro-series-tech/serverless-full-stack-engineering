
import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Upload, Icon, Button } from 'antd';
import { 
    switchModalVisibility
} from 'actions/crud';

const initialState = {
    confirmLoading: false,
    image: null,
}
class ImageCRUD extends Component {
    state = initialState;
    handleOk = () => {
        this.setState({
            confirmLoading: true
        });
        /* TODO: 
         - Apply save operation here 
         - hide if success
         - show error popup if error
         */
        setTimeout(() => {
            this.setState(initialState);
            this.props.switchModalVisibility(false);
        }, 2000);
    }
    handleCancel = () => {
        this.setState(initialState);
        this.props.switchModalVisibility(false);
    }
    handleImageRead = (file) =>{
        /* the file reader to parse the image file */
        const reader = new FileReader();
        /* parse the image */
        reader.addEventListener('load', () => {
            this.setState({ image: reader.result });
        });
        /* parse as URL data */
        reader.readAsDataURL(file);
        /* we want to upload manually */
        return false;
    }
    handleImageRemove = () =>{
        this.setState({
            image: null
        });
    }
    render() {

        let uploadButton; 
        if(!this.state.image){
            uploadButton = (
                <div style={styles.uploadDiv}>
                    <Button type="primary" shape="round" icon="upload" size={50}>Browser Picture</Button>
                </div>
            );
        }
        return (
            <Modal
                centered={true}
                okText="Create"
                cancelText="Cancel"
                visible={this.props.visible}
                destroyOnClose={true}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div style={styles.uploadDiv}>
                    <Upload
                        name="image"
                        accept=".png,.jpg,.jpeg"
                        listType="picture"
                        className="image-uploader"
                        multiple={false}
                        beforeUpload={this.handleImageRead}
                        onRemove={this.handleImageRemove}
                        disabled={this.state.image != null}
                    >
                        {uploadButton}
                    </Upload>
                 </div>
            </Modal>
        )
    }
}
const styles = {
    uploadDiv:{
        paddingTop: 20,
        width: '100%',
        textAlign: 'center'
    }
};
const mapStateToProps = (state, ownProps) => {
    return {
        record: state.crud.imageRecord,
        visible: state.crud.modalVisible,
        credentials: state.authentication.credentials
    };
};
const mapDispatchToProps = {
    switchModalVisibility
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageCRUD);