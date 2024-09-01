import { GraphQLClient } from "graphql-request";
const isClient = typeof window !== "undefined"
export const graphqlClient = new GraphQLClient("http://localhost:8000/graphql",{
    headers:()=>({
        Authorization: isClient? `Bearer ${window.localStorage.getItem('twitter_token')}`:""
    })
})



// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMGozaW02ZjAwMDBldmRwZDNjMTc5a28iLCJuYW1lIjoiQWJ1IFphaWQiLCJlbWFpbCI6InphaWQ3MDk3OUBnbWFpbC5jb20iLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLQnJwR2VxTjIzV2UtMDdDX21yQzhIVXc3SWQ1LUdxM0IyTlh0NW84OFpFNWtCRl9xTj1zOTYtYyIsImNyZWF0ZWRBdCI6IjIwMjQtMDktMDFUMDQ6NTI6NTQuODU1WiIsImlhdCI6MTcyNTE2ODY5M30.lspoqYNaOLE0LLnkeh6xV9cm9GMKRIH0wF9ayfSz9lg"