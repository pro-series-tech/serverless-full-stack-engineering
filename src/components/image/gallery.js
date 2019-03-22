
import React, { Component } from "react";
import { connect } from "react-redux";
import { Skeleton, Card, Icon, Button, Input, Rate } from 'antd';
import { PICTURE_BUCKET } from "lib/environment";
import { fetchGalleryImageRecords} from 'actions/gallery';

const { Meta } = Card;

const initialState = {
    isLoading: true
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
                cover={<img alt="image" style={styles.image} src={url} />}
                >
                    <Skeleton loading={false} active>
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
                    </Skeleton>
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
    },
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