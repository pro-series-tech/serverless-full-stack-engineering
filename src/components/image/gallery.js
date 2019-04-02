
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Rate } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PICTURE_BUCKET } from 'lib/environment';
import { fetchGalleryImageRecords} from 'actions/gallery';
import Item from 'components/image/item';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Meta } = Card;

class Gallery extends Component {
    componentDidMount = async()=>{
        this.props.fetchGalleryImageRecords();
    }
    render() {

        let { records, index, searchText } = this.props;
        /* if there is something to search */
        if (searchText){
            /* build the wildcard filter */
            let filter = `*${searchText}*`;
            console.log(filter);
            let matches = index.search(filter).map((m) =>m.ref);
            let set = new Set(matches);
            records = records.filter((r) => set.has(r.pictureId));
        }

        const items = records.map((record, i) => {
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
        searchText: ownProps.searchText,
        credentials: state.authentication.credentials,
        records: state.gallery.records,
        index: state.gallery.index
    };
};
const mapDispatchToProps = {
    fetchGalleryImageRecords
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gallery);