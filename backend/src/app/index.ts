import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { User } from "./user";
import { Tweet } from "./tweet";
import cors from "cors";
import { GrapqlContext } from "../interfaces";
import JWTService from "../services/jwt";

const FRONTEND_URL = process.env.FRONTEND_URL || "";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: [FRONTEND_URL],
      credentials: true,
    })
  );
  const graphqlServer = new ApolloServer<GrapqlContext>({
    typeDefs: `#graphql
            ${User.types}
            ${Tweet.types}
            type Query{
                ${User.queries}
                ${Tweet.queries}
            }
            type Mutation {
                ${User.mutations}
                ${Tweet.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Tweet.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Tweet.resolvers.mutations
      },
      ...Tweet.resolvers.extraResolvers
    },
  });
  await graphqlServer.start();
  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decondeToken(req.headers.authorization.split("Bearer ")[1])
            : undefined,
        };
      },
    })
  );
  return app;
}
