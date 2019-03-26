
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Rate } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PICTURE_BUCKET } from "lib/environment";
import { fetchGalleryImageRecords} from 'actions/gallery';
import Item from 'components/image/item';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Meta } = Card;

class Gallery extends Component {
    componentWillMount = async()=>{
        this.props.fetchGalleryImageRecords();
    }
    render() {
        const items = this.props.records.map((record, i) => {
            return <Item key={i} record={record} />
        });
        return (
            <div style={styles.container}>
                {items}
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