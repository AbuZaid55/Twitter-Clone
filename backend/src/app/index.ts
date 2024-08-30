import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import { User } from './user'
import cors from 'cors'

const FRONTEND_URL = process.env.FRONTEND_URL || ''

export async function initServer() {
    const app = express()
    app.use(bodyParser.json())
    app.use(cors({
        origin:[FRONTEND_URL],
        credentials:true
    }))
    const graphqlServer = new ApolloServer({
        typeDefs:`#graphql
            ${User.types}
            type Query{
                ${User.queries}
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries
            },
            Mutation:{
                ...User.resolvers.mutations
            }
        }
    })
    await graphqlServer.start()
    app.use('/graphql',expressMiddleware(graphqlServer))
    return app;
}