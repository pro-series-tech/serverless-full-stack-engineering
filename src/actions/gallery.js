import {
    GALLERY_SET_IMAGE_RECORDS,
    CRUD_SET_IMAGE_RECORD
} from "lib/types";
import DataStorage from 'lib/data-storage';

export const fetchGalleryImageRecords = () => async (dispatch, getState) => {
    
    const { credentials } = getState().authentication;
    const dataStorageClient = new DataStorage(credentials);
    const records = await dataStorageClient.getPictureRecords();

    dispatch({
        type: GALLERY_SET_IMAGE_RECORDS,
        payload: records
    });
};

export const putImageRecord = (newRecord) => async (dispatch, getState) => {

    let { records } = getState().gallery;
    const { credentials } = getState().authentication;
    const dataStorageClient = new DataStorage(credentials);
    const result = await dataStorageClient.putPictureRecord(newRecord);

    /* remove the old record if present, meaning that we are updating */
    records = records.filter((record) => record.pictureId !== result.pictureId);

    dispatch({
        type: GALLERY_SET_IMAGE_RECORDS,
        payload: [result, ...records]
    });
    dispatch({
        type: CRUD_SET_IMAGE_RECORD,
        payload: null
    });
};

export const deleteGalleryImageRecord= (id) => async (dispatch, getState) => {

    const { records } = getState().gallery;
    const { credentials } = getState().authentication;
    const dataStorageClient = new DataStorage(credentials);
    await dataStorageClient.deletePictureRecord(id);

    dispatch({
        type: GALLERY_SET_IMAGE_RECORDS,
        payload: records.filter((record) => record.pictureId !== id)
    });
};
