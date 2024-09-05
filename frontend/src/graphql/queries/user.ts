import { graphql } from "../../../gql";

export const LogIn = graphql(`
  #graphql
  query logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`);

export const GetCurrentUser = graphql(`
  #graphql
  query getCurrentUser {
    getCurrentUser {
      avatar
      createdAt
      email
      id
      name
    }
  }
`);

export const GetUserById = graphql(`
  #graphql
  query getUserById($id: String!) {
    getUserById(id: $id) {
      id
      name
      email
      avatar
      createdAt
      followers {
        id
      }
      followings {
        id
      }
      tweets {
        id
        content
        imageUrl
        updatedAt
        author {
          id
          name
          avatar
        }
      }
    }
  }
`);
