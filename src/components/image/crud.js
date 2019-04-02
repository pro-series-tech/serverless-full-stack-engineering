import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Upload, Icon, Button, Input, Rate, Progress, notification } from 'antd';
import ReactQuill from 'react-quill';
import nanoid from 'nanoid';
import { switchModalVisibility } from 'actions/crud';
import { putImageRecord } from 'actions/gallery';
import DataStorage from 'lib/data-storage';
import ObjectStorage from 'lib/object-storage';

import 'react-quill/dist/quill.snow.css';

const initialState = {
	name: '',
	image: null,
	rating: 1,
	userId: null,
	description: '',
	confirmLoading: false,
	uploadPercentage: 0
};
class ImageCRUD extends Component {
	state = initialState;
	componentWillReceiveProps(nextProps) {
		if (nextProps.record) {
			this.setState({
				...nextProps.record
			});
		}
	}
	handleCreateEdit = async () => {
		this.setState({
			confirmLoading: true
		});
		try {
			if (this.state.userId) {
				/* pass updated record */
				this.props.putImageRecord({
					...this.state
				});
			} else {
				/* get the id */
				let pictureId = nanoid();
				/* get the clients with fresh credentials */
				let objectStorageClient = new ObjectStorage(this.props.credentials);
				/* first we insert the picture */
				let pResult = await objectStorageClient.putPictureFile(this.state.image, `${pictureId}.png`, prg => {
					this.setState({
						uploadPercentage: parseInt((prg.loaded / prg.total) * 100)
					});
				});
				/* fetch new records */
				this.props.putImageRecord({ ...this.state, pictureId });
			}
			/* reinit the state and  switch modal visibility */
			this.setState(initialState);
			/* show success notification */
			notification.success({
				message: 'Picture Saved Successfully',
				description: `Picture '${this.state.name}' was successfully saved.`
			});
			/* switch modal visibility off */
			this.props.switchModalVisibility(false);
		} catch (e) {
			this.setState({
				confirmLoading: false
			});
			/* show notification for error */
			notification.error({
				message: 'Error Saving Picture',
				description: e.message
			});
		}
	};
	handleCancel = () => {
		this.setState(initialState);
		this.props.switchModalVisibility(false);
	};
	handleImageRead = file => {
		this.setState({
			image: file
		});
		return false;
	};
	handleImageRemove = () => {
		this.setState({
			image: null
		});
	};
	handleRateChange = value => {
		this.setState({
			rating: value
		});
	};
	handleNameChange = e => {
		this.setState({
			name: e.target.value
		});
	};
	handleDescriptionChange = value => {
		this.setState({
			description: value
		});
	};
	dataIsValid = () => {
		let nameIsValid = this.state.name.trim() !== '';
		let descriptionIsValid = this.state.description.trim() !== '';
		let imageIsValid = this.state.image != null;

		return nameIsValid && descriptionIsValid && imageIsValid;
	};
	render() {
		let { image, userId, name, description, rating } = this.state;

		let uploadButton;
		if (!this.state.image && !userId) {
			uploadButton = (
				<div style={styles.uploadDiv}>
					<Button type='primary' shape='round' icon='upload' size='large'>
						Browser Picture
					</Button>
				</div>
			);
		}
		return (
			<Modal
				centered={true}
				okText={userId ? 'Edit' : 'Create'}
				cancelText='Cancel'
				visible={this.props.visible || userId != null}
				destroyOnClose={true}
				confirmLoading={this.state.confirmLoading}
				onOk={this.handleCreateEdit}
				onCancel={this.handleCancel}
				cancelButtonProps={{
					disabled: this.state.confirmLoading
				}}
				okButtonProps={{
					disabled: !this.dataIsValid() && !userId
				}}
			>
				<div style={styles.uploadDiv}>
					<Upload name='image' accept='.png' listType='picture' className='image-uploader' multiple={false} beforeUpload={this.handleImageRead} onRemove={this.handleImageRemove} disabled={image !== null && image !== undefined}>
						{uploadButton}
					</Upload>
				</div>
				<Rate style={styles.rating} tooltips={['bad', 'ok', 'good', 'excellent', 'outstanding']} onChange={this.handleRateChange} character={<Icon type='heart' />} value={rating} />
				<br />
				<Input style={styles.name} value={name} prefix={<Icon type='picture' />} onChange={this.handleNameChange} placeholder='Picture Name' />
				<br />
				<ReactQuill value={description} onChange={this.handleDescriptionChange} placeholder='Picture Description' />
				<br />
				<Progress percent={this.state.uploadPercentage} />
			</Modal>
		);
	}
}
const styles = {
	uploadDiv: {
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
	putImageRecord,
	switchModalVisibility
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageCRUD);
