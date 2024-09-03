export const queries = `#graphql 
    logIn(email:String!,password:String!):String!
    getCurrentUser:User!
    getUserById(id:String!):User!
`