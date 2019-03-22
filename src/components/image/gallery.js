
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Rate } from 'antd';
import { PICTURE_BUCKET } from "lib/environment";
import { fetchGalleryImageRecords} from 'actions/gallery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Meta } = Card;

const initialState = {
    loadArray: []
}
class Gallery extends Component {
    state = initialState;
    componentWillMount = async()=>{
        this.props.fetchGalleryImageRecords();
    }
    renderImages = ()=>{
        
        return this.props.records.map((record, i)=>{
            const url = `https://s3.amazonaws.com/${PICTURE_BUCKET}/${record.userId}/${record.pictureId}.png`;
            return (<Card
                key={i}
                hoverable
                style={styles.card}
                actions={[<Icon type="edit" />, <Icon type="delete" />]}
                cover={<LazyLoadImage alt="image" width={'100%'} src={url} effect="blur"/>}
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
        });
    }
    render() {
        return (
            <div style={styles.container}>
                    {this.renderImages()}
            </div>
        )
    }
}
const styles = {
  container:{
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap',
        alignItems: 'baseline'
  },
  card:{
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
        credentials: state.authentication.credentials,
        records: state.gallery.records
    };
};
const mapDispatchToProps = {
    fetchGalleryImageRecords
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gallery);