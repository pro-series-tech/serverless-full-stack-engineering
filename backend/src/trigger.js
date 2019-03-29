'use strict';
const AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {

    /* get the record from incoming stream */
    const { eventName, dynamodb, awsRegion} = event.Records[0];

    if (eventName === 'REMOVE'){
        // TODO: remove picture here
        const { pictureId, userId } = dynamodb.Keys;
        const { PICTURE_BUCKET } = process.env;
        const key = `${userId}/${pictureId}.png`; 
        /* create the  S3 object */
        const s3 = new AWS.S3({
            apiVersion: '2006-03-01'
        });
        const params = {
            Bucket: PICTURE_BUCKET,
            Key: key
        };
        /* delete the image */
        s3.deleteObject(params, (err, data) => {
            if(err){
                callback(err, 'Error deleting image');
            }else{
                callback(null, `Image deleted: ${key}`);
            }
        });
    }else{
        callback(null, `No deletion event:${eventName}`);
    }
};   