/**
 * This script exports the lambda function that responds to table store
 * triggers. It will delete the image file when a record in the table is deleted.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
'use strict';
const AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
    /* get the record from incoming stream */
    const { eventName, dynamodb, awsRegion} = event.Records[0];
    /*  */
    if (eventName === 'REMOVE'){
        // TODO: remove picture here
        const { pictureId, userId } = dynamodb.Keys;
        /* the the picure bucket name */
        const { PICTURE_BUCKET } = process.env;
        /* build the picture S3 key */
        const key = `${userId.S}/${pictureId.S}.png`; 
        /* create the  S3 object */
        const s3 = new AWS.S3({apiVersion: '2006-03-01'});
        /* the delete Object params */
        const params = {
            Bucket: PICTURE_BUCKET,
            Key: key
        };
        /* log the object key */
        console.log("deleting object", key);
        /* delete the image */
        s3.deleteObject(params, (err, data) => {
            if(err){
                callback(err, 'Error deleting image');
            }else{
                callback(null, `Image deleted: ${key}`);
            }
        });
    }else{
        /* this is not a deletion event */
        callback(null, `No deletion event:${eventName}`);
    }
};   