/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql \n    mutation createTweet($content: String!, $imageUrl: String) {\n        createTweet(content: $content, imageUrl: $imageUrl) {\n            id\n        }\n}\n": types.CreateTweetDocument,
    "\n    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {\n        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar)\n    }\n": types.SignUpDocument,
    "\n    mutation continueWithGoogle($name: String!, $email: String!, $avatar: String!) {\n        continueWithGoogle(name: $name, email: $email, avatar: $avatar)\n    }\n": types.ContinueWithGoogleDocument,
    " \n    mutation followUser($to: ID!) {\n        followUser(to: $to)\n    }\n": types.FollowUserDocument,
    " \n    mutation unFollowUser($to: ID!) {\n        unFollowUser(to: $to)\n    }\n": types.UnFollowUserDocument,
    "#graphql \n    query getAllTweets {\n      getAllTweets {\n        content\n        createdAt\n        id\n        imageUrl\n        updatedAt\n        author {\n          id\n          name\n          email\n          avatar\n        }\n      }\n    }\n": types.GetAllTweetsDocument,
    "#graphql\n  query Query($imageType: String!, $imageName: String!) {\n    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n  }\n": types.QueryDocument,
    "\n  #graphql\n  query logIn($email: String!, $password: String!) {\n    logIn(email: $email, password: $password)\n  }\n": types.LogInDocument,
    "\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      avatar\n      createdAt\n      email\n      id\n      name\n      recommondedUsers {\n        id\n        name\n        avatar\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  query getUserById($id: String!) {\n    getUserById(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      followers {\n        id\n      }\n      followings {\n        id\n      }\n      tweets {\n        id\n        content\n        imageUrl\n        updatedAt\n        author {\n          id\n          name\n          avatar\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n    mutation createTweet($content: String!, $imageUrl: String) {\n        createTweet(content: $content, imageUrl: $imageUrl) {\n            id\n        }\n}\n"): (typeof documents)["#graphql \n    mutation createTweet($content: String!, $imageUrl: String) {\n        createTweet(content: $content, imageUrl: $imageUrl) {\n            id\n        }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {\n        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar)\n    }\n"): (typeof documents)["\n    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {\n        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation continueWithGoogle($name: String!, $email: String!, $avatar: String!) {\n        continueWithGoogle(name: $name, email: $email, avatar: $avatar)\n    }\n"): (typeof documents)["\n    mutation continueWithGoogle($name: String!, $email: String!, $avatar: String!) {\n        continueWithGoogle(name: $name, email: $email, avatar: $avatar)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n    mutation followUser($to: ID!) {\n        followUser(to: $to)\n    }\n"): (typeof documents)[" \n    mutation followUser($to: ID!) {\n        followUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n    mutation unFollowUser($to: ID!) {\n        unFollowUser(to: $to)\n    }\n"): (typeof documents)[" \n    mutation unFollowUser($to: ID!) {\n        unFollowUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n    query getAllTweets {\n      getAllTweets {\n        content\n        createdAt\n        id\n        imageUrl\n        updatedAt\n        author {\n          id\n          name\n          email\n          avatar\n        }\n      }\n    }\n"): (typeof documents)["#graphql \n    query getAllTweets {\n      getAllTweets {\n        content\n        createdAt\n        id\n        imageUrl\n        updatedAt\n        author {\n          id\n          name\n          email\n          avatar\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query Query($imageType: String!, $imageName: String!) {\n    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n  }\n"): (typeof documents)["#graphql\n  query Query($imageType: String!, $imageName: String!) {\n    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query logIn($email: String!, $password: String!) {\n    logIn(email: $email, password: $password)\n  }\n"): (typeof documents)["\n  #graphql\n  query logIn($email: String!, $password: String!) {\n    logIn(email: $email, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      avatar\n      createdAt\n      email\n      id\n      name\n      recommondedUsers {\n        id\n        name\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      avatar\n      createdAt\n      email\n      id\n      name\n      recommondedUsers {\n        id\n        name\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getUserById($id: String!) {\n    getUserById(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      followers {\n        id\n      }\n      followings {\n        id\n      }\n      tweets {\n        id\n        content\n        imageUrl\n        updatedAt\n        author {\n          id\n          name\n          avatar\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getUserById($id: String!) {\n    getUserById(id: $id) {\n      id\n      name\n      email\n      avatar\n      createdAt\n      followers {\n        id\n      }\n      followings {\n        id\n      }\n      tweets {\n        id\n        content\n        imageUrl\n        updatedAt\n        author {\n          id\n          name\n          avatar\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;