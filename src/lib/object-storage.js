import AWS from 'aws-sdk';
import { DATA_TABLE_NAME } from 'lib/types';
import { AWS_REGION, PICTURE_BUCKET } from "lib/environment";

export default class ObjectStorage {
    constructor(credentials) {
        /* instantiate the S3 client with desired region */
        this.s3 = new AWS.S3({
            params: { Bucket: PICTURE_BUCKET },
            apiVersion: '2006-03-01',
            region: AWS_REGION,
            credentials
        });
        this.identityId = credentials.identityId;
    }
    getPictureFile = async () => {

    }
    putPictureFile = (file, key, progressFunc) => {
        let upload = this.s3.upload({
            Key: `${this.identityId}/${key}`,
            Body: file,
            ACL: 'public-read'
        });
        if(progressFunc){
            upload.on('httpUploadProgress',progressFunc);
        }
        return upload.promise();
    }
    deletePictureFile = ({ id }) => {

    }
}