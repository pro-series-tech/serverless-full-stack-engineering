"use strict";

import { ApolloServer, gql } from "apollo-server-lambda";
import { schema } from "./schema";
import { resolvers } from "./resolvers";

const typeDefs = gql(schema);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: false
  }
});