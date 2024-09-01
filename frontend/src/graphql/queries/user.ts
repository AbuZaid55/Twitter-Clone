import { graphql } from "../../../gql";

export const LogIn = graphql(`#graphql
    query logIn($email:String!,$password:String!){
        logIn(email:$email,password:$password)
    }
`)

export const GetCurrentUser = graphql(`#graphql
    query getCurrentUser {
        getCurrentUser {
            avatar
            createdAt
            email
            id
            name
        }
    }    
`)