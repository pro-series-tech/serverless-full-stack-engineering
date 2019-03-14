
import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from 'antd';
import { 
    switchModalVisibility
} from 'actions/crud';

class ImageCRUD extends Component {
    state = {
        confirmLoading: false
    }
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
            this.setState({
                confirmLoading: false
            });
            this.props.switchModalVisibility(false);
        }, 2000);
    }
    handleCancel = () => {
        this.props.switchModalVisibility(false);
    }
    render() {
        return (
            <Modal
                centered={true}
                okText="Create"
                cancelText="Cancel"
                visible={this.props.visible}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                hello there modafuca
            </Modal>
        )
    }
}
const styles = {

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