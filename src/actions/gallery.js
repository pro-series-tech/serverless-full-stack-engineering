import {
    GALLERY_SET_IMAGE_RECORDS
} from "lib/types";
import DataStorage from 'lib/data-storage';

export const fetchGalleryImageRecords = (records) => async (dispatch, getState) => {
    
    const { credentials } = getState().authentication;
    const dataStorageClient = new DataStorage(credentials);
    const records = await dataStorageClient.getPictureRecords();

    dispatch({
        type: GALLERY_SET_IMAGE_RECORDS,
        payload: records
    });
};
