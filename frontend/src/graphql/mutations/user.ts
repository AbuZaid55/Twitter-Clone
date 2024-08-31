import { graphql } from "../../../gql";

export const signUp = graphql(`
    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {
        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar) {
            status
            message
        }
    }
`)
export const ContinueWithGoogle = graphql(`
    mutation Mutation($name: String!, $email: String!, $avatar: String!) {
        continueWithGoogle(name: $name, email: $email, avatar: $avatar) {
            status
            message
            user {
                id
                name
                email
                avatar
                createdAt
            }
        }
    }
`)