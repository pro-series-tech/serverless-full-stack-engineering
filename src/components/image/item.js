
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Rate, Popconfirm, notification } from 'antd';
import { PICTURE_BUCKET } from "lib/environment";
import { deleteGalleryImageRecord } from 'actions/gallery';
import { setImageRecord } from 'actions/crud';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Meta } = Card;

class Item extends Component {
    handleEdit = ()=>{
        this.props.setImageRecord(this.props.record);
    }
    handleDelete = ()=>{
        try{
            this.props.deleteGalleryImageRecord(this.props.record.pictureId);
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
    render() {
        const { record, index} = this.props;
        const url = `https://s3.amazonaws.com/${PICTURE_BUCKET}/${record.userId}/${record.pictureId}.png`;
        /* render the card */
        return (<Card
            key={index}
            hoverable
            style={styles.card}
            actions={[
                <Icon type="edit" onClick={this.handleEdit}/>, 
                <Popconfirm
                    placement="bottomLeft"
                    title={`Are you sure you want to delete '${this.props.record.name}'?`}
                    onConfirm={this.handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Icon type="delete"/>
                </Popconfirm>
            ]}
            cover={<LazyLoadImage alt="image" width={'100%'} src={url} effect="blur" />}
        >
            <Meta
                title={record.name}
                description={<div dangerouslySetInnerHTML={{ __html: record.description }} />}
            />
            <Rate
                style={styles.rating}
                character={<Icon type="heart" />}
                value={record.rating}
                disabled
            />
        </Card>)
    }
}
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
const mapStateToProps = (state, ownProps) => {
    return {
        record: ownProps.record,
        index: ownProps.index
    };
};
const mapDispatchToProps = {
    deleteGalleryImageRecord,
    setImageRecord
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);