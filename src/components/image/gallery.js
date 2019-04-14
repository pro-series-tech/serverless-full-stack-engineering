/**
 * This script exports the Gallery component.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/* local imports */
import Item from 'components/image/item';
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
        let { records, index, searchText } = this.props;
        /* if there is something to search(string not empty, null, or undefined) */
        if (searchText){
            /* build the wildcard filter */
            let filter = `*${searchText}*`;
            /* search with filter, then map list of results to ref property.
            this will yield a array of id's*/
            let matches = index.search(filter).map((m) =>m.ref);
            /* create a set of id's (for O(1) search complexity in the next
            instruction) */
            let set = new Set(matches);
            /* filter the current records who's id is in the matching list */
            records = records.filter((r) => set.has(r.pictureId));
        }
        /* create a list of Item components(Cards) by mapping each
        record in the array to a react component */
        const items = records.map((record, i) => {
            return <Item key={i} record={record} />
        });
        /* render the component with items(cards) */
        return (
            <div style={styles.container}>
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
/* wrap the form before passing it out to redux connect */
const mapStateToProps = (state, ownProps) => {
    return {
        index: state.gallery.index,
        records: state.gallery.records,
        searchText: ownProps.searchText,
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