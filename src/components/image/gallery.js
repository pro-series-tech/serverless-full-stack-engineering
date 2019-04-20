/**
 * This script exports the Gallery component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* local imports */
import { ImageItem } from 'components/image';
import { localPropTypes } from 'lib/prop-types';
import { fetchGalleryImageRecords} from 'actions/gallery';
/* component initial state constant */
const initialState = {};
class Gallery extends Component {
	/* set the instance initial state as initialState clone */
	state = {...initialState}
	/**
	 * When the component mounts, fetch image gallery records.
	 * @async
	 */
    componentDidMount = async()=>{
        this.props.fetchGalleryImageRecords();
    }
	/**
	 * Renders the gallery component.
	 * @returns {React.Component}
	 */
    render() {
        /* destruct and asign variables from properties object */
        let { records, searchIndex, searchText } = this.props;
        /* if there is something to search(string not empty, null, or undefined) */
        if (searchText){
            /* build the wildcard filter */
            let filter = `*${searchText}*`;
            /* search with filter, then map list of results to ref property.
            this will yield a array of id's*/
            let matches = searchIndex.search(filter).map((m) =>m.ref);
            /* create a set of id's (for O(1) search complexity in the next
            instruction) */
            let set = new Set(matches);
            /* filter the current records who's id is in the matching list */
            records = records.filter((r) => set.has(r.pictureId));
        }
        /* create a list of Item components(Cards) by mapping each
        record in the array to a react component */
        const items = records.map((record, i) => {
            return <ImageItem key={i} record={record} />
        });
        /* render the component with items(cards) */
        return (
            <div 
                data-test='container'
                style={styles.container}
                >
                {items}
            </div>
        )
    }
}
/* component styles */
const styles = {
  container:{
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'baseline'
  }
};

/* PropTypes for data type validation */
Gallery.propTypes = {
    records: PropTypes.array,
    searchText: PropTypes.string,
    searchIndex: PropTypes.object,
    credentials: localPropTypes.credentials.isRequired
}
/* wrap the form before passing it out to redux connect */
const mapStateToProps = (state, ownProps) => {
    return {
        records: state.gallery.records,
        searchText: ownProps.searchText,
        searchIndex: state.gallery.searchIndex,
        credentials: state.authentication.credentials
    };
};
/* redux map dispatch functions to properties */
const mapDispatchToProps = {
    fetchGalleryImageRecords
};
/* wrap this component into a redux component */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Gallery);