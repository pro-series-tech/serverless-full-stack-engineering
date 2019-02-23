"use strict";

import { graphqlLambda, graphiqlLambda } from "apollo-server-lambda";
import { makeExecutableSchema } from "graphql-tools";
import { schema } from "./schema";
import { resolvers } from "./resolvers";

/* create executable from provided schema */
const graphQlSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

/* exporting the lambda handler */
exports.graphqlHandler = (event, context, callback) => {
  const calbackWithHeaders = (error, output) => {
    output.headers["Access-Control-Allow-Origin"] = "*";
    callback(error, output);
  };

  /* wraph schema executable to graphql lambda object */
  const handler = graphqlLambda({ schema: graphQlSchema });

  return handler(event, context, calbackWithHeaders);
};
