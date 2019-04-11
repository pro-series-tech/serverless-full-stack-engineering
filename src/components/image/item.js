/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Card, 
    Icon, 
    Rate, 
    Popover,
    Popconfirm, 
    notification 
} from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
/* local imports */
import { setImageRecord } from 'actions/crud';
import { deleteGalleryImageRecord } from 'actions/gallery';
import { PICTURE_BUCKET, API_ENDPOINT } from 'lib/environment';
/* import react lazy image load css */
import 'react-lazy-load-image-component/src/effects/blur.css';
/* destruct the Meta component from Card */
const { Meta } = Card;
/* component initial state constant */
const initialState = {
    info: ''
};
class Item extends Component {
	/* set the instance initial state as initialState clone */
    state = {...initialState}
    
    /**
     * Handles edit event which trigger the setImage record action.
     */
    handleEdit = ()=>{
        this.props.setImageRecord(this.props.record);
    }
	/**
	 * Handles the information hover event. This event will do a request to 
     * the serverless function wich will extract image information using ImageMagick.
	 * @async
	 */
    handleInfo = async ()=>{
        /* get record, create endpoint url, and image key */
        const { record } = this.props;
        /* create endpoint url for the image analysis lambda function */
        const url = `${API_ENDPOINT}/image/analysis`;
        const key = `${record.userId}/${record.pictureId}.png`
        /* request the information to AWS lambda */
        const response = await fetch(url, {
            /* Use the HTTP POST protocol */
            method: 'POST',
            /* Send a JSON object with the key as data */
            body: JSON.stringify({ key })
        });
        /* wait for data object, then destruct to get the desired properties */
        let {depth, geometry, colorspace, filesize} = await response.json();
        /* render the incoming data into a component */
        let info = (
            <ul>
                <li>Depth {depth}</li>
                <li>Geometry: {geometry}</li>
                <li>Colorspace: {colorspace}</li>
                <li>File Size: {filesize}</li>
            </ul>
        );
        /* save the information in the current state */
        this.setState({
            info
        });
    }
    /**
     * Handles the delete confirmation, this function will delete the image from
     * the serverless backend and remove the record from the curren state.
     * @async
     */
    handleDelete = async()=>{
        /* this is an example of how to wrap the async calls in try catch blocks.
        in the case of a error, the catch block will be executed and we can alert
        the user about situation */
        try{
            /* wait for the image to be deleted(both image and metadata) */
            await this.props.deleteGalleryImageRecord(this.props.record.pictureId);
            /* show removal notification */
            notification.info({
                message: 'Picture Successfully Removed',
                description: `Picture '${this.props.record.name}' was successfully removed.`
            });
        }catch(e){
            /* show notification for error */
            notification.error({
                message: 'Error Removing Picture',
                description: e.message
            });
        }
    }
	/**
	 * Renders the item(Card) component.
	 * @returns {React.Component}
	 */
    render() {
        /* use destructing to get the record and index from properties */
        const { record, index } = this.props;
        /* buld the image S3 image url for this record */
        const url = `https://s3.amazonaws.com/${PICTURE_BUCKET}/${record.userId}/${record.pictureId}.png`;
        /* render the card */
        return (
            /* the Card ant design component */
            <Card
                hoverable
                key={index}
                style={styles.card}
                /* the following visual elements at the bottom of the card.
                   Each one is a component with their own properties and event handlers.
                   Note that the Card component automatically position these elements. 
                   */
                actions={[
                    /* the edit icon with handleEdit event function */
                    <Icon type='edit' onClick={this.handleEdit}/>, 
                    /* popover to show the image information when the incon is hover */
                    <Popover 
                        title='Info' 
                        trigger='hover'
                        content={this.state.info} 
                        onMouseEnter={this.handleInfo} 
                    >
                        <Icon type='info-circle' />
                    </Popover>, 
                    /* the confirm component which will provide the user the confirmation buttons to
                    proceed or cancel the image deletion */
                    <Popconfirm
                        okText='Yes'
                        cancelText='No'
                        placement='bottomLeft'
                        onConfirm={this.handleDelete}
                        title={`Are you sure you want to delete '${this.props.record.name}'?`}
                    > 
                        <Icon type='delete'/>
                    </Popconfirm>
                ]}
                /* the cover property will show the image corresponding to this record.
                We use the LazyLoadImage component instead of the <img> native element in order
                to provide the blur effect and lazy loading */
                cover={
                    <LazyLoadImage 
                        src={url} 
                        alt='image' 
                        effect='blur' 
                        width={'100%'} 
                />}
            >
                {/* The metadata of the Card will show our description text. Note that we use the
                 dangerouslySetInnerHTML property because the description is actually HTML markup.
                 For more information look the ReactQuill usage in the CRUD component. */}
                <Meta
                    title={record.name}
                    description={<div dangerouslySetInnerHTML={{ __html: record.description }} />}
                />
                {/* We use a disabled(readonly) Rate component to display the rating  */}
                <Rate
                    style={styles.rating}
                    character={<Icon type='heart' />}
                    value={record.rating}
                    disabled
                />
            </Card>
        )
    }
}
/* component styles */
const styles = {
    card: {
        margin: 3,
        width: 250,
        heigth: 100
    },
    rating: {
        color: 'red'
    }
};
/* wrap the form before passing it out to redux connect */
const mapStateToProps = (state, ownProps) => {
    return {
        index: ownProps.index,
        record: ownProps.record
    };
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = {
    setImageRecord,
    deleteGalleryImageRecord
};
/* wrap this component into a redux component */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);