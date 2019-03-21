
import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Upload, Icon, Button, Input, Rate, Progress } from 'antd';
import ReactQuill from 'react-quill';
import nanoid from 'nanoid';
import { 
    switchModalVisibility
} from 'actions/crud';
import DataStorage from 'lib/data-storage';
import ObjectStorage from 'lib/object-storage';

import 'react-quill/dist/quill.snow.css';

const initialState = {
    uploadPercentage: 0,
    dataStorageClient: null,
    objectStorageClient: null,
    confirmLoading: false,
    image: null,
    rating: 1,
    name: '',
    description: ''
}
class ImageCRUD extends Component {
    state = initialState;
    componentDidMount = () => {
        this.setState({
            dataStorageClient: new DataStorage(this.props.credentials),
            objectStorageClient: new ObjectStorage(this.props.credentials)
        });
    }
    handleOk = async () => {
        this.setState({
            confirmLoading: true
        });
        try{
            let id = nanoid();
            /* first we insert the picture */
            let pResult = await this.state.objectStorageClient.putPictureFile(
                this.state.image,
                `${id}.png`,
                (prg)=>{
                    this.setState({
                        uploadPercentage: parseInt((prg.loaded / prg.total) * 100)
                    });
                }
            ); 
            console.log("result for file insert", pResult);
            let dResult = await this.state.dataStorageClient.putPictureRecord({...this.state, id});
            console.log("result for insert", dResult);
            this.setState(initialState);
            this.props.switchModalVisibility(false);
        }catch(e){
            this.setState({
                confirmLoading: false
            });
            /*TODO: set failure alert here */
            console.log("ERROR occured while persisting",e);
        }
    }
    handleCancel = () => {
        this.setState(initialState);
        this.props.switchModalVisibility(false);
    }
    handleImageRead = (file) =>{
        this.setState({
            image: file,
        });
        // /* the file reader to parse the image file */
        // const reader = new FileReader();
        // /* parse the image */
        // reader.addEventListener('load', () => {
        //     this.setState({ 
        //         image: reader.result,
        //     });
        // });
        // /* parse as URL data */
        // reader.readAsDataURL(file);
        /* we want to upload manually */
        return false;
    }
    handleImageRemove = () =>{
        this.setState({
            image: null
        });
    }
    handleRateChange = (value)=>{
        this.setState({
            rating: value
        });
    }
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    handleDescriptionChange = (value) =>{
        this.setState({
            description: value
        });
    }
    dataIsValid = ()=>{
        let nameIsValid = this.state.name.trim() !== '';
        let descriptionIsValid = this.state.description.trim() !== '';
        let imageIsValid = this.state.image != null;
        
        return nameIsValid && descriptionIsValid && imageIsValid;
    }
    render() {

        let uploadButton; 
        if(!this.state.image){
            uploadButton = (
                <div style={styles.uploadDiv}>
                    <Button type="primary" shape="round" icon="upload" size='large'>Browser Picture</Button>
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
                okButtonProps={{
                    disabled: !this.dataIsValid()
                }}
            >
                <div style={styles.uploadDiv}>
                    <Upload
                        name="image"
                        accept=".png"
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
                <Rate
                    style={styles.rating}
                    tooltips={['bad', 'ok', 'good', 'excellent', 'outstanding']}
                    onChange={this.handleRateChange}
                    character={<Icon type="heart" />}
                    value={this.state.rating}
                />
                 <br/>
                <Input
                    style={styles.name}
                    value={this.state.name}
                    prefix={<Icon type="picture" />}
                    onChange={this.handleNameChange}
                    placeholder="Picture Name"
                />
                <br/>
                <ReactQuill
                    value={this.state.description}
                    onChange={this.handleDescriptionChange} 
                    placeholder="Picture Description"
                /> 
                <br/>
                <Progress percent={this.state.uploadPercentage} />   
            </Modal>
        )
    }
}
const styles = {
    uploadDiv:{
        paddingTop: 20,
        width: '100%',
        textAlign: 'center'
    },
    rating: {
        marginTop: 15,
        marginBottom: 15,
        color: 'red'
    },
    name: {
        marginBottom: 15
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