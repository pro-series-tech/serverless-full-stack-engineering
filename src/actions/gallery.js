/**
 * This script exports the Gallery actions.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import {
    CRUD_SET_IMAGE_RECORD,
    GALLERY_SET_IMAGE_RECORDS
} from 'lib/types';
import DataStorage from 'lib/data-storage';
/**
 * Fetchs all image records from serverless backend and dispatch set image records action
 * to gallery reducer.
 * @async
 */
export const fetchGalleryImageRecords = () => async (dispatch, getState) => {
    /* get current credentials from state */
    const { credentials } = getState().authentication;
    /* create a new DataStorage API instance with given credentials */
    const dataStorageClient = new DataStorage(credentials);
    /* fetch records and wait for results, this is a async function */
    const records = await dataStorageClient.getPictureRecords();
    /* dispatch action */
    dispatch({
        type: GALLERY_SET_IMAGE_RECORDS,
        payload: records
    });
};
/**
 * Persist new image record into serverless backend and dispatch the set gallery records
 * to galley reducer. Finally dispatch the set image record into crud reducer to reset
 * the selected image object in case we are updating the record.
 * @async
 * @param  {Object} newRecord
 */
export const putImageRecord = (newRecord) => async (dispatch, getState) => {
    /* get records array from gallery state */
    let { records } = getState().gallery;
    /* get current credentials form authentication state */
    const { credentials } = getState().authentication;
    /* create a new DataStorage API instance with given credentials */
    const dataStorageClient = new DataStorage(credentials);
    /* persist new image record into serverless backend. Wait for async operation to finish */
    const result = await dataStorageClient.putPictureRecord(newRecord);

    /* remove the old record if present, meaning that we are updating instead of
    inserting a new record */
    records = records.filter((record) => record.pictureId !== result.pictureId);
    /* dispatch the set records array back into gallery reducer, it will include
    the modified or new image record along the previous existing records */
    dispatch({
        type: GALLERY_SET_IMAGE_RECORDS,
        /* the current new or updated record, and expanding the array from current records
        in state */
        payload: [result, ...records]
    });
    /* Dispatch action to reset current selected image from CRUD state. This is necessary if
    we are updating a record, in case of a new record, the action won't do any effect. */
    dispatch({
        type: CRUD_SET_IMAGE_RECORD,
        payload: null
    });
};
/**
 * Removes image record from serverless backend and dispatch the set gallery records
 * action into gallery reducer to reflect the image removal.
 * @async
 * @param  {string} id
 */
export const deleteGalleryImageRecord= (id) => async (dispatch, getState) => {
    /* get records array from gallery state */
    let { records } = getState().gallery;
    /* get current credentials form authentication state */
    const { credentials } = getState().authentication;
    /* create a new DataStorage API instance with given credentials */
    const dataStorageClient = new DataStorage(credentials);
    /* delete picture record in serverless backend */
    await dataStorageClient.deletePictureRecord(id);
    /* dispatch the records back into gallery state but without the record we just
    deleted. We use array filter to return a new array instance without the just deleted
    record. */
    dispatch({
        type: GALLERY_SET_IMAGE_RECORDS,
        /* keep all the records which id is not the one we deleted */
        payload: records.filter((record) => record.pictureId !== id)
    });
};
