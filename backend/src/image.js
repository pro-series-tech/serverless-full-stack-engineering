/**
 * This script exports the lambda function to extract image file information
 * using ImageMagick.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
'use strict';
const fs = require('fs')
const path = require('path');
const AWS = require("aws-sdk");
const im = require('imagemagick');

module.exports.handler = async (event, context, callback) => {
    /* the S3 sdk object */
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const { PICTURE_BUCKET } = process.env;
    const {key} = JSON.parse(event.body);
    /* the object parameters */
    const params = { Bucket: PICTURE_BUCKET, Key: key };
    /* get the data */
    const data = await s3.getObject(params).promise();
    /* the lambda path for temporary files */
    const filePath = path.join('/tmp', 'image.png');
    /* write image to disk */
    fs.writeFileSync(filePath, data.Body);
    /* extract image metadata */
    let features = await new Promise((resolve, reject) => {
        im.identify(filePath, (err, features) => (err)?reject(err):resolve(features))
    });
    /* return object in response */
    return { 
        statusCode: 200, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(features)
    };
};
