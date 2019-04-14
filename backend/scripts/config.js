/**
 * This script exports the serverless configuration function for the
 * serverless-stack-output Serverless Framework plugin.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
const fs = require('fs')
const path = require('path')

/*  this handler will be called by the plugin 'serverless-stack-output' */
function handler (data, serverless, options) {
  /* log the incoming data */
  console.log('Received data', data)
  console.log('Received options', options)

  /* build the configuration string in a .env file */
  let config = [
    `REACT_APP_AWS_REGION=${options.region}`,
    `REACT_APP_ENVIRONMENT=${options.stage}`,
    `REACT_APP_USER_POOL_ID=${data.UserPoolId}`,
    `REACT_APP_ENDPOINT=${data.ServiceEndpoint}`,
    `REACT_APP_IDENTITY_POOL_ID=${data.IdentityPoolId}`,
    `REACT_APP_PICTURES_TABLE=${data.PicturesTableName}`,
    `REACT_APP_PICTURES_BUCKET=${data.PicturesBucketName}`,
    `REACT_APP_FRONT_END_BUCKET=${data.FrontEndBucketName}`,
    `REACT_APP_USER_POOL_CLIENT_ID=${data.UserPoolClientId}`,
  ].join('\n')
  /* write configuration to file */
  fs.writeFileSync(path.join(__dirname, `../../.${options.stage}.env`), config)
}
/* export the handler */
module.exports = { handler }
