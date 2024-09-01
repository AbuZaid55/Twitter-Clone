import { graphql } from "../../../gql";

export const LogIn = graphql(`#graphql
    query logIn($email:String!,$password:String!){
        logIn(email:$email,password:$password){
            status
            message
            user {
                id
                name
                email
                avatar
                createdAt
                twitter_token
            }
        }
    }
`)