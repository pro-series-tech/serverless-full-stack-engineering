
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Rate } from 'antd';
import { PICTURE_BUCKET } from "lib/environment";
import {  } from 'actions/gallery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Meta } = Card;

class Item extends Component {
    handleEdit = ()=>{
        alert("editing " + this.props.record.pictureId)
    }
    handleDelete = ()=>{
        alert("deleting " + this.props.record.pictureId)
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
                <Icon type="delete" onClick={this.handleDelete}/>
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
        width: 200,
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
    
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);