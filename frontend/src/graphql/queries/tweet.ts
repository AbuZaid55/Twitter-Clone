import { graphql } from "../../../gql";
export const GetAllTweets = graphql(`#graphql 
    query getAllTweets {
      getAllTweets {
        content
        createdAt
        id
        imageUrl
        updatedAt
        author {
          id
          name
          email
          avatar
        }
      }
    }
`)

export const GetSignedUrlForTweet = graphql(`#graphql
  query Query($imageType: String!, $imageName: String!) {
    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)
  }
`)