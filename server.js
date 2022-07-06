import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

import config from "./config.js";

const { MONGODBURL } = config;

async function startServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    persistedQueries: false,
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose
    .connect(MONGODBURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(async () => {
      console.log("MongoDB Connected");
      await new Promise((resolve) =>
        httpServer.listen({ port: 4000 }, resolve)
      );
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    })
    .catch((err) => console.log(err));
}

startServer(typeDefs, resolvers);
