const fs = require('fs')
const path = require('path')

/*  this handler will be called by the plugin 'serverless-stack-output' */
function handler (data, serverless, options) {
  console.log('Received data', data)
  console.log('Received options', options)

  /* build the configuration string */
  let config = [
    `REACT_APP_ENVIRONMENT=${options.stage}`,
    `REACT_APP_ENDPOINT=${data.ServiceEndpoint}`,
    `REACT_APP_USER_POOL_CLIENT_ID=${data.UserPoolClientId}`,
    `REACT_APP_USER_POOL_ID=${data.UserPoolId}`,
    `REACT_APP_IDENTITY_POOL_ID=${data.IdentityPoolId}`,
    `REACT_APP_PICTURES_BUCKET=${data.PicturesBucketName}`,
    `REACT_APP_FRONT_END_BUCKET=${data.FrontEndBucketName}`
  ].join('\n')
  /* write configuration to file */
  fs.writeFileSync(path.join(__dirname, `../../.${options.stage}.env`), config)
}
/* export the handler */
module.exports = { handler }
