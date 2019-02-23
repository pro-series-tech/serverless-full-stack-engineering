const fs = require("fs");
const path = require("path");

/*  this handler will be called by the plugin 'serverless-stack-output' */
function handler(data, serverless, options) {
  console.log("Received data", data);
  console.log("Received options", options);

  /* build the configuration string */
  let config = [
  `REACT_APP_ENVIRONMENT=${options.stage}`,
  `REACT_APP_ENDPOINT=${data.ServiceEndpoint}`
  ].join("\n");
  /* write configuration to file */
  fs.writeFileSync(path.join(__dirname, `../../.${options.stage}.env`), config);
}
/* export the handler */
module.exports = { handler };
