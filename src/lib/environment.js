/**
 * This script exports the all the environment constants imported via the corresponding
 * .env file.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* exporting environment variables */
/* endpoint for the serverless functions */
export const API_ENDPOINT = process.env.REACT_APP_ENDPOINT;
/* the aws region to specify in AWS sdk */
export const AWS_REGION = process.env.REACT_APP_AWS_REGION;
/* environment (dev, qua, pro) */
export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;
/* user pool identifier for serverless userbase */
export const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
/* the pictures table name */
export const PICTURE_TABLE = process.env.REACT_APP_PICTURES_TABLE;
/* the picture storage bucket name */
export const PICTURE_BUCKET = process.env.REACT_APP_PICTURES_BUCKET;
/* the identity pool identifier, which provides access to AWS resources */
export const IDENTITY_POOL_ID = process.env.REACT_APP_IDENTITY_POOL_ID;
/* the user pool client identifier which provides access to using the SDK */
export const USER_POOL_CLIENT_ID = process.env.REACT_APP_USER_POOL_CLIENT_ID;