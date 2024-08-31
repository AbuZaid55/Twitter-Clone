import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { LogIn } from "@/graphql/queries/user";
import { graphqlClient } from "@/client/graphqlClient";

interface User {
    id: string
    name: string
    email: string
    avatar?: string
    createdAt: string
}

interface Profile {
    iss: string,
    azp: string,
    aud: string,
    sub: string,
    email: string,
    email_verified: string,
    at_hash: string,
    name: string,
    picture: string,      
    given_name: string,
    family_name: string,
    iat: number,
    exp: number
}

interface Account {
    provider: string,
    type: string,
    providerAccountId: string,
    access_token?: string,
    expires_at?: number,
    scope?: string,    
    token_type?: string,
    id_token?: string
}

const googleClientId=process.env.GOOGLE_CLIENT_ID || ""
const googleClientSecret=process.env.GOOGLE_CLIENT_SECRET || ""

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
        }),
        GoogleProvider({
            clientId:googleClientId,
            clientSecret:googleClientSecret
        })
    ],
    callbacks:{
        async signIn({account,profile}:{account:Account,profile:Profile | undefined}){
            if(account.provider=="google"){
                if(profile){
                    const {name,email,picture} = profile
                    
                }else {
                    return false
                }
            }
            return true
        },
        async session ({session,token}:{session:any,token:any}){
            session.user.id = token.id
            session.user.avatar = token.avatar
            session.user.createdAt = token.createdAt
            return session
        },
        async jwt ({token,user}:{token:any,user:any}){
            if(token && user){
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.avatar = (user.image)?user.image:user.avatar
                token.createdAt = user.createdAt
            }
            return token
        }
    },
    secret:process.env.NEXTAUTH_SECRET
}
export default authOptions