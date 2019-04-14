/**
 * This script exports the Gallery reducer.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import lunr from 'lunr';
/* local imports */
import {
    AUTHENTICATION_SIGN_OUT,
    GALLERY_SET_IMAGE_RECORDS
} from 'lib/types';
/**
 * This function will build a index using the provided
 * image record array. The index is sarchable using the
 * picture name and description. For more information about
 * lunr visit: https://lunrjs.com
 * @param  {Object} records=[]
 */
const buildIndex = (records = [])=>{
    /* return the index for current records */
    return lunr(function () {
        /* use picture id as unique reference */
        this.ref('pictureId');
        /* index name and description fields of each
        object */
        this.field('name');
        this.field('description');
        /* remove the stemmer and stop words filter, this will
        allow full text search, even stop words */
        this.pipeline.remove(lunr.stemmer);
        this.pipeline.remove(lunr.stopWordFilter);
        /* add image records to the index */
        records.forEach((r) => {
            this.add(r);
        });
    });
};
/* store initial state constant */
const initialState = {
    records: [],
    /* build the initial empty index */
    index: buildIndex()
};
export default (state = initialState, action) => {
    switch (action.type) {
        case GALLERY_SET_IMAGE_RECORDS:
            return {
                ...state,
                records: action.payload,
                /* rebuild index when the records array
                changes */
                index: buildIndex(action.payload)
            }
        case AUTHENTICATION_SIGN_OUT:
            return initialState;
        default:
            return state
    }
}