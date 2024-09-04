import { User } from "@prisma/client"
import { LognIn, signup, ContinueWithGoogle, getUserById } from "../../api/user"
import { SignUpPayload } from "../../interfaces"
import {GrapqlContext} from '../../interfaces'
import { GetTweetsByAuthor } from "../../api/tweet"



const queries = {
    logIn:async(_:any,{email,password}:{email:string,password:string})=>{
        const result = await LognIn(email,password)
        return result
    },
    getCurrentUser:async(_:any,args:any,ctx:GrapqlContext)=>{
        if(!ctx.user) throw new Error("You are not authenticated!")
        return ctx.user
    },
    getUserById:async(_:any,{id}:{id:string})=>{
        const result = await getUserById(id)
        return result;
    }
}
const mutations = {
    signUp:async(_:any,data:SignUpPayload)=>{
        const result = await signup(data)
        return result;
    },
    continueWithGoogle:async(_:any,{name,email,avatar}:{name:string,email:string,avatar:string})=>{
        const result = await ContinueWithGoogle(name,email,avatar) 
        return result;
    }
}
const extraResolvers = {
    User:{
        tweets:async(parent:User) => await GetTweetsByAuthor(parent.id) 
    }
}
export const resolvers = {mutations, queries,extraResolvers}