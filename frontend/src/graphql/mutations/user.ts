import { graphql } from "../../../gql";

export const SignUp = graphql(`
    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {
        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar)
    }
`)
export const ContinueWithGoogle = graphql(`
    mutation continueWithGoogle($name: String!, $email: String!, $avatar: String!) {
        continueWithGoogle(name: $name, email: $email, avatar: $avatar)
    }
`)
export const FollowUser = graphql(` 
    mutation followUser($to: ID!) {
        followUser(to: $to)
    }
`)
export const UnFollowUser = graphql(` 
    mutation unFollowUser($to: ID!) {
        unFollowUser(to: $to)
    }
`)