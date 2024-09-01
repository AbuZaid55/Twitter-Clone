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
    "\n    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {\n        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar) {\n            status\n            message\n        }\n    }\n": types.SignUpDocument,
    "\n    mutation Mutation($name: String!, $email: String!, $avatar: String!) {\n        continueWithGoogle(name: $name, email: $email, avatar: $avatar) {\n            status\n            message\n            user {\n                id\n                name\n                email\n                avatar\n                createdAt\n                twitter_token\n            }\n        }\n    }\n": types.MutationDocument,
    "#graphql\n    query logIn($email:String!,$password:String!){\n        logIn(email:$email,password:$password){\n            status\n            message\n            user {\n                id\n                name\n                email\n                avatar\n                createdAt\n                twitter_token\n            }\n        }\n    }\n": types.LogInDocument,
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
export function graphql(source: "\n    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {\n        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar) {\n            status\n            message\n        }\n    }\n"): (typeof documents)["\n    mutation SignUp($name: String!, $email: String!, $password: String!, $confirm_pass: String!, $avatar: String!) {\n        signUp(name: $name, email: $email, password: $password, confirm_pass: $confirm_pass, avatar: $avatar) {\n            status\n            message\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Mutation($name: String!, $email: String!, $avatar: String!) {\n        continueWithGoogle(name: $name, email: $email, avatar: $avatar) {\n            status\n            message\n            user {\n                id\n                name\n                email\n                avatar\n                createdAt\n                twitter_token\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation Mutation($name: String!, $email: String!, $avatar: String!) {\n        continueWithGoogle(name: $name, email: $email, avatar: $avatar) {\n            status\n            message\n            user {\n                id\n                name\n                email\n                avatar\n                createdAt\n                twitter_token\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query logIn($email:String!,$password:String!){\n        logIn(email:$email,password:$password){\n            status\n            message\n            user {\n                id\n                name\n                email\n                avatar\n                createdAt\n                twitter_token\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n    query logIn($email:String!,$password:String!){\n        logIn(email:$email,password:$password){\n            status\n            message\n            user {\n                id\n                name\n                email\n                avatar\n                createdAt\n                twitter_token\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;