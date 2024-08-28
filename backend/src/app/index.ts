import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'

export async function initServer() {
    const app = express()
    app.use(bodyParser.json())
    const graphqlServer = new ApolloServer({
        typeDefs:`#graphql
            type Query{
                seyHello:String
            }
        `,
        resolvers:{
            Query:{
                seyHello:()=> 'Hello i am zaid'
            }
        }
    })
    await graphqlServer.start()
    app.use('/graphql',expressMiddleware(graphqlServer))
    return app;
}