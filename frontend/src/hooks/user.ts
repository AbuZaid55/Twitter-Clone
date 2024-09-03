import { graphqlClient } from "@/client/graphqlClient"
import { GetCurrentUser } from "@/graphql/queries/user"
import { useQuery } from "@tanstack/react-query"
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey:['current-user'],
        refetchOnWindowFocus:false,
        queryFn:()=> graphqlClient.request(GetCurrentUser),
        retry:2,
        enabled:false
    })
    if(query.isError){
        const error = query?.error as any
        toast.error(error?.response?.errors[0]?.message)
        signOut()
        window.localStorage.removeItem('twitter_token')
    }
    return {...query,user:query?.data?.getCurrentUser}
}