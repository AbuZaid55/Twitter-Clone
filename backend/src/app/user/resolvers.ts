import { User } from "@prisma/client"
import { LognIn, signup, ContinueWithGoogle, getUserById, FollowUser, UnFollowUser, GetFollowers, GetFollowing, GetRecommonedUser } from "../../api/user"
import { SignUpPayload } from "../../interfaces"
import {GrapqlContext} from '../../interfaces'
import { GetTweetsByAuthor } from "../../api/tweet"
import { prisma } from "../../client/db"



const queries = {
    logIn:async(_:any,{email,password}:{email:string,password:string})=>{
        const result = await LognIn(email,password)
        return result
    },
    getCurrentUser:async(_:any,args:any,ctx:GrapqlContext)=>{
        if(!ctx.user || !ctx.user?.id) throw new Error("You are not authenticated!")
        const result = await prisma.user.findUnique({where:{id:ctx.user.id}})
        if(!result) throw new Error("User not found!");
        return result
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
    },
    followUser:async(_:any,{to}:{to:string},ctx:GrapqlContext)=>{
        if(!ctx.user || !ctx.user?.id) throw new Error("You are not authenticated!")
        const result = await FollowUser(ctx.user.id,to)
        return result;
    },
    unFollowUser:async(_:any,{to}:{to:string},ctx:GrapqlContext)=>{
        if(!ctx.user || !ctx.user?.id) throw new Error("You are not authenticated!")
        const result = await UnFollowUser(ctx.user.id,to)
        return result;
    }
}
const extraResolvers = {
    User:{
        tweets:async(parent:User) => await GetTweetsByAuthor(parent.id),
        followers:async(parent:User) => await GetFollowers(parent.id),
        followings:async(parent:User)=> await GetFollowing(parent.id),
        recommondedUsers:async(parent:User)=> await GetRecommonedUser(parent.id)
    }
}
export const resolvers = {mutations, queries,extraResolvers}