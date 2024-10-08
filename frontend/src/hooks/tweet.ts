import { graphqlClient } from "@/client/graphqlClient"
import { CreateTweet } from "@/graphql/mutations/tweets"
import { GetAllTweets } from "@/graphql/queries/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface setState {
    setContent:Function
    setFile:Function
    setSelectedImageUrl:Function
    setSignedUrl:Function
}

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey:['all-tweets'],
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        queryFn:()=> graphqlClient.request(GetAllTweets)
    })
    return {...query,tweets:query?.data?.getAllTweets}
}

export const useCreateTweet = ({setContent,setFile,setSelectedImageUrl,setSignedUrl}:setState) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn:(payload:{content:string, imageUrl?:string})=>graphqlClient.request(CreateTweet,{content:payload.content,imageUrl:payload.imageUrl}),
        onMutate: () => toast.loading("Creating Tweet",{id:"1"}),
        onSuccess: async() => {
            await queryClient.invalidateQueries({queryKey:['all-tweets']})
            toast.success("Created Success",{id:"1"})
            setContent('')
            setFile({type:''})
            setSelectedImageUrl('')
            setSignedUrl('')
        },
        onError:(error:any)=>{
            toast.error(error?.response?.errors[0]?.message,{id:"1"})
        }
    })
    return mutation
}