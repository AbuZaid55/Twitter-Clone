import { graphqlClient } from "@/client/graphqlClient"
import { GetAllTweets } from "@/graphql/queries/tweet"
import { useQuery } from "@tanstack/react-query"

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey:['all-tweets'],
        queryFn:()=> graphqlClient.request(GetAllTweets)
    })
    return {...query,tweets:query?.data?.getAllTweets}
}