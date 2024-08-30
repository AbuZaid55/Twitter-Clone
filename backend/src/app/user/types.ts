export const types = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String
        createdAt: String!
    }
    type Response {
        status: Int!
        message: String!
        user:User
    }
`