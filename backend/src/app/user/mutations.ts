export const mutations = `#graphql
    signUp(name: String!, email: String!, avatar: String!, password: String!, confirm_pass: String!): String!
    continueWithGoogle(name:String!,email:String!,avatar:String!):String!
`;