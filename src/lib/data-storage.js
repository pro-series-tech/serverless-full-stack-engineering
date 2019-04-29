/**
 * This script exports the Authentication class which wraps the Cognito Identity SDK.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import AWS from 'aws-sdk';
/* local imports */
import { AWS_REGION, PICTURE_TABLE } from 'lib/environment';
export default class DataStorage{
    /**
     * Constructor for DataStorage class.
     * @param {CognitoIdentityCredentials} credentials 
     */
    constructor(credentials){
        /* instantiate the document client with desired region */
        this.docClient = new AWS.DynamoDB.DocumentClient({ 
            region: AWS_REGION,
            credentials 
        });
        /* get the identity id(user id) in order to 
        use as partition key in serverless column store table */
        this.identityId = credentials.identityId;
    }
    /**
     * Get the collection of picture records.
     * @async
     * @returns {Object[]}
     */
    getPictureRecords = async ()=>{
        /* the table parameters */
        let params = {
            TableName: PICTURE_TABLE,
            ExpressionAttributeValues: {
                ':userId': this.identityId
            },
            /* get only the records for this user. Note that this is
            enforced in the table policy, other users cannot access 
            records other than his. For more information look at
            'CognitoAuthorizedPolicy' in the security.yml file located at
            backend/resources diretory */
            KeyConditionExpression: 'userId = :userId',
        };
        /* query table async, await until data arrives */
        let data = await this.docClient.query(params).promise();
        /* return data items */
        return data.Items;
    }
    
    /**
     * Put(create or update) single picture record in table.
     * @param  {Object} param
     * @param  {string} param.name
     * @param  {string} param.description
     * @param  {number} param.rating
     * @param  {string} param.pictureId
     * @returns {Promise}
     */
    putPictureRecord = ({ name, description, rating, pictureId})=>{
        /* the TTL of the image record  for 30 minutes */
        let ttl = Date.now() + 60*30*1000;
        /* put record parameters */
        let params = {
            TableName: PICTURE_TABLE,
            Item: {
                userId: this.identityId, 
                pictureId,
                name,
                description,
                rating,
                ttl
            }
        };  
        /* insert/update the object in the serverless column store.
         */
        return this.docClient.put(params).promise().then(()=>{
            return params.Item;
        });
    }
    /**
     * Delete record from storage table with provided identifier.
     * @param  {string} pictureId
     * @returns {Promise}
     */
    deletePictureRecord = (pictureId) =>{
        /* the delete record params */
        let params = {
            TableName: PICTURE_TABLE,
            Key: {
                userId: this.identityId,
                pictureId
            }
        };
        /* delete record and return promise */
        return this.docClient.delete(params).promise();
    }
}