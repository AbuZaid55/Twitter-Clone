import { graphql } from "../../../gql";

export const signUp = graphql(`
    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String) {
        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar) {
            status
            message
        }
    }
`)