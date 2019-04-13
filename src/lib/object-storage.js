/* external imports */
import AWS from 'aws-sdk';
/* local imports */
import { AWS_REGION, PICTURE_BUCKET } from 'lib/environment';

export default class ObjectStorage {
    /**
     * Constructor for ObjectStorage class.
     * @param {CognitoIdentityCredentials} credentials 
     */
    constructor(credentials) {
        /* instantiate the S3 client with desired region */
        this.s3 = new AWS.S3({
            params: { Bucket: PICTURE_BUCKET },
            apiVersion: '2006-03-01',
            region: AWS_REGION,
            credentials
        });
        /* get the identity id(user id) in order to 
        use as object prefix key in serverless object storage */
        this.identityId = credentials.identityId;
    }
    /**
     * Insert/update picture file in serverless object storage.
     * @param  {Blob} file 
     * @param  {string} key
     * @param  {Function} progressFunc
     * @returns {Promise}
     */
    putPictureFile = (file, key, progressFunc) => {
        /* upload file and return upload handler */
        let upload = this.s3.upload({
            /* the object key is: userid/pictureid.png*/
            Key: `${this.identityId}/${key}`,
            /* the blob file to upload */
            Body: file,
            /* we make the pictures public for simplicity
            purposes, you can apply any policy or ACL here */
            ACL: 'public-read'
        });
        /* if progress function was provided, bind to 'httpUploadProgress'
        event. */
        if(progressFunc){
            upload.on('httpUploadProgress',progressFunc);
        }
        /* return promise of upload operation */
        return upload.promise();
    }
    /**
     * Uploads avatar image picture. 
     * @param  {Blob} file
     * @returns {Promise}
     */
    putAvatarPictureFile = (file) => {
        /* Reuse putPictureFile function to upload user avatar */
        return this.putPictureFile(file, 'avatar.png');
    }
}