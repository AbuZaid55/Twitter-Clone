export const types = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String!
        createdAt: String!
        twitter_token: String
        tweets: [Tweet]
    }
`