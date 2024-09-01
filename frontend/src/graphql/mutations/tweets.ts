import { graphql } from "../../../gql";

export const CreateTweet = graphql(`#graphql 
    mutation createTweet($content: String!, $imageUrl: String) {
        createTweet(content: $content, imageUrl: $imageUrl) {
            id
        }
}
`)