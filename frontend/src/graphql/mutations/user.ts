import { graphql } from "../../../gql";

export const SignUp = graphql(`
    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {
        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar)
    }
`)
export const ContinueWithGoogle = graphql(`
    mutation Mutation($name: String!, $email: String!, $avatar: String!) {
        continueWithGoogle(name: $name, email: $email, avatar: $avatar)
    }
`)