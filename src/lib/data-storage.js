import AWS from 'aws-sdk';
import { AWS_REGION, PICTURE_TABLE } from 'lib/environment';

export default class DataStorage{
    constructor(credentials){
        /* instantiate the document client with desired region */
        this.docClient = new AWS.DynamoDB.DocumentClient({ 
            region: AWS_REGION,
            credentials 
        });
        this.identityId = credentials.identityId;
    }
    getPictureRecords = async ()=>{
        let params = {
            TableName: PICTURE_TABLE,
            ExpressionAttributeValues: {
                ':userId': this.identityId
            },
            KeyConditionExpression: 'userId = :userId',
        };
        let data = await this.docClient.query(params).promise();
        /* return data items */
        return data.Items;
    }
    putPictureRecord = ({ name, description, rating, pictureId})=>{
        let params = {
            TableName: PICTURE_TABLE,
            Item: {
                userId: this.identityId, 
                pictureId,
                name,
                description,
                rating
            }
        };  
        return this.docClient.put(params).promise().then(()=>{
            return params.Item;
        });
    }
    deletePictureRecord = (pictureId) =>{
        let params = {
            TableName: PICTURE_TABLE,
            Key: {
                userId: this.identityId,
                pictureId
            }
        };
        return this.docClient.delete(params).promise();
    }
}