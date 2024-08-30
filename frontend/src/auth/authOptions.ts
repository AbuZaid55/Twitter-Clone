import CredentialProvider from "next-auth/providers/credentials";
import { LogIn } from "@/graphql/queries/user";
import { graphqlClient } from "@/client/graphqlClient";

interface User {
    id: string
    name: string
    email: string
    avatar?: string
    createdAt: string
}

const authOptions = {
    providers:[
        CredentialProvider({
            credentials: {},
            async authorize(credentials:any){
                const {email,password} = credentials
                const data = await graphqlClient.request(LogIn,{email,password})
                if(data.logIn?.status!=200){
                    throw new Error(data.logIn?.message)
                }
                const user = data.logIn.user
                if(user){
                    return user
                }else{
                    return null
                }
            }
        })
    ],
    callbacks:{
        async session ({session,token}:{session:any,token:any}){
            console.log("Sessioni=>",session,token)
            return session
        },
        async jwt ({token,user}:{token:any,user:any}){
            if(token && user){
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.avatar = user.avatar
                token.createdAt = user.createdAt
            }
            return token
        }
    },
    pages:{
        signIn:"/login",
    },
    secret:process.env.NEXTAUTH_SECRET
}
export default authOptions