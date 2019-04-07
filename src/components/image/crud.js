/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	Icon, 
	Rate, 
	Modal, 
	Input, 
	Upload, 
	Button, 
	Progress, 
	notification 
} from 'antd';
import nanoid from 'nanoid';
import ReactQuill from 'react-quill';
/* local imports */
import ObjectStorage from 'lib/object-storage';
import { putImageRecord } from 'actions/gallery';
import { switchModalVisibility } from 'actions/crud';
/* import react quill editor css */
import 'react-quill/dist/quill.snow.css';
/* component initial state constant */
const initialState = {
	name: '',
	rating: 1,
	image: null,
	userId: null,
	description: '',
	uploadPercentage: 0,
	confirmLoading: false
};
class ImageCRUD extends Component {
	/* set the instance initial state as initialState clone */
	state = {...initialState}
	/**
	 * The next state object with update props. This function will be triggered each time
	 * a component's property changes,. i.e. any property listed in mapStateToProps. The
	 * idea is that whe a image record is selected, the props.record property will change
	 * and we will copy the record fields from the redux state to the local component state.
	 * map;
	 * @param {Object} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		/* if record is not null or undefined, copy the object to
		the local state. This is used when we select a existing image record 
		and we want to edit */
		if (nextProps.record) {
			this.setState({
				/* destruct the image record into local state fields */
				...nextProps.record
			});
		}
	}
	/**
	 * Handles the create or edit action.
	 * @async
	 */
	handleCreateEdit = async () => {
		/* first we set the loading UI on */
		this.setState({
			confirmLoading: true
		});
		/* we wrap the entire operation with a try and catch. In
		case the async function yields error, it will fall into the 
		catch section */
		try {
			/* if the userID is present, it means we are editing an existing
			record and not creating a new one. */
			if (this.state.userId) {
				/* update record into serverles backend by invoking action */
				await this.props.putImageRecord({
					...this.state
				});
			} else {
				/* get the id using the nanoid library.
				More info: https://github.com/ai/nanoid
				 */
				let pictureId = nanoid();
				/* get the clients with fresh credentials */
				let objectStorageClient = new ObjectStorage(this.props.credentials);
				/* first we insert the picture */
				await objectStorageClient.putPictureFile(this.state.image, `${pictureId}.png`, prg => {
					/* reflect the upload progress by updating the uploadPercentage in the local
					state */
					this.setState({
						uploadPercentage: parseInt((prg.loaded / prg.total) * 100)
					});
				});
				/* insert image file into serverless backend */
				await this.props.putImageRecord({ ...this.state, pictureId });
			}
			/* reinit the state and switch modal visibility, we are setting a copy of the initial state
			object by destructing in a object literal */
			this.setState({...initialState});
			/* show success notification */
			notification.success({
				message: 'Picture Saved Successfully',
				description: `Picture '${this.state.name}' was successfully saved.`
			});
			/* switch modal visibility off */
			this.props.switchModalVisibility(false);
		} catch (e) {
			/* there was an error, remove loading UI */
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
	/**
	 * Handle CRUD cancel event. 
	 */
	handleCancel = () => {
		/* reset to initial state */
		this.setState({...initialState});
		/* close CRUD modal by executing action */
		this.props.switchModalVisibility(false);
	};
	/**
	 * Save the selected file into local state. Returns false to prevent file picker
	 * component from trying to upload the image automatically.
	 * @param {File}
	 * @returns {boolean}
	 */
	handleImageRead = (file) => {
		/* set the image state */
		this.setState({
			image: file
		});
		/* return false to prevent default ant design component upload action */
		return false;
	};
	
	/**
	 * Handles the image removal functionality.
	 */
	handleImageRemove = () => {
		/* set local state image to null */
		this.setState({
			image: null
		});
	};
	/**
	 * Handles the rating value change and save the new rating
	 * into local component state.
	 * @param  {number} value
	 */
	handleRateChange = (value) => {
		/* set the new rating value */
		this.setState({
			rating: value
		});
	};
	
	/**
	 * Handles the image name input field change event.
	 * @param  {Event} e
	 */
	handleNameChange = (e) => {
		/* set the new name value into local component state */
		this.setState({
			name: e.target.value
		});
	};
	/**
	 * Handles the description input field change event.
	 * @param  {string} value
	 */
	handleDescriptionChange = (value) => {
		/* set the new description value into local component state */
		this.setState({
			description: value
		});
	};
	
	/**
	 * Validate all image fields by checking that non are empty.
	 * @returns {boolean}
	 */
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
		/**
		 * Renders the CRUD modal component.
		 * @returns {React.Component}
		 */
		return (
			/* the ant design modal component */
			<Modal
				centered={true}
				cancelText='Cancel'
				destroyOnClose={true}
				onOk={this.handleCreateEdit}
				onCancel={this.handleCancel}
				okText={userId ? 'Edit' : 'Create'}
				confirmLoading={this.state.confirmLoading}
				visible={this.props.visible || userId != null}
				cancelButtonProps={{
					disabled: this.state.confirmLoading
				}}
				okButtonProps={{
					disabled: !this.dataIsValid() && !userId
				}}
			>
				{/* Fields needed to create/edit an image in serverless backend */}
				<div style={styles.uploadDiv}>
					<Upload name='image' accept='.png' listType='picture' className='image-uploader' multiple={false} beforeUpload={this.handleImageRead} onRemove={this.handleImageRemove} disabled={image !== null && image !== undefined}>
						{uploadButton}
					</Upload>
				</div>
				<Rate style={styles.rating} tooltips={['bad', 'ok', 'good', 'excellent', 'outstanding']} onChange={this.handleRateChange} character={<Icon type='heart' />} value={rating} />
				<br />
				<Input style={styles.name} value={name} prefix={<Icon type='picture' />} onChange={this.handleNameChange} placeholder='Picture Name' />
				<br />
				{/* React quill editor. More info: https://github.com/zenoamaro/react-quill */}
				<ReactQuill value={description} onChange={this.handleDescriptionChange} placeholder='Picture Description' />
				<br />
				<Progress percent={this.state.uploadPercentage} />
			</Modal>
		);
	}
}
/* component styles */
const styles = {
	uploadDiv: {
		width: '100%',
		paddingTop: 20,
		textAlign: 'center'
	},
	rating: {
		color: 'red',
		marginTop: 15,
		marginBottom: 15
	},
	name: {
		marginBottom: 15
	}
};
/* wrap the form before passing it out to redux connect */
const mapStateToProps = (state, ownProps) => {
	return {
		record: state.crud.imageRecord,
		visible: state.crud.modalVisible,
		credentials: state.authentication.credentials
	};
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = {
	putImageRecord,
	switchModalVisibility
};
/* wrap this component into a redux component */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageCRUD);
