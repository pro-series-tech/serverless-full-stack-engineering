
const AWS = require('aws-sdk');
/* add promise dependency to AWS SDK */
AWS.config.setPromisesDependency(Promise);
/* instantiate the dynamodb client, NOTE: since this runs in AWS lambda, the AWS
SDK is already present in the execution environment */
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 *
 * @param {*} args
 */
const getUserInfo = async args => {
    /* query the user table with the given handle */
    let result = await docClient
      .query({
        TableName: "Users",
        KeyConditionExpression: "handle = :v1",
        ExpressionAttributeValues: {
          ":v1": args.handle
        }
      }).promise();
    /* map all the reults */
    let listOfTweets;
    /* if a user is found, return the information */
    if (result.Items.length >= 1) {
        listOfTweets = {
            name: result.Items[0].name,
            handle: result.Items[0].handle,
            location: result.Items[0].location,
            description: result.Items[0].description,
            followers_count: result.Items[0].followers_count,
            friends_count: result.Items[0].friends_count,
            favourites_count: result.Items[0].favourites_count,
            following: result.Items[0].following,
        };
    }
    return listOfTweets;
};

/**
 * 
 * @param {*} handle 
 * @param {*} args 
 */
const getPaginatedTweets = (handle, args) =>{

};

/* export resolvers */
export const resolvers = {
  Query: {
    getUserInfo: (root, args) => getUserInfo(args)
  },
  User: {
    tweets: (obj, args) => getPaginatedTweets(obj.handle, args)
  }
};
