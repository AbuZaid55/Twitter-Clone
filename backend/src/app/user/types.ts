export const types = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String
        password: String!
        confirm_pass: String!
        createdAt: String!
    }
    type Response {
        status: Int!
        message: String!
    }
`