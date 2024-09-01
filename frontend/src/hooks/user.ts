import { graphqlClient } from "@/client/graphqlClient"
import { GetCurrentUser } from "@/graphql/queries/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey:['current-user'],
        queryFn:()=> graphqlClient.request(GetCurrentUser)
    })
    return {...query,user:query?.data?.getCurrentUser}
}