export const mutations = `#graphql
    signUp(name: String!, email: String!, avatar: String!, password: String!, confirm_pass: String!): Response!
    continueWithGoogle(name:String!,email:String!,avatar:String!):Response!
`;