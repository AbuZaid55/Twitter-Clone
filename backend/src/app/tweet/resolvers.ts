import { Tweet } from '@prisma/client'
import { CreateTweet, GetAllTweets, GetSignedURlForTweet } from '../../api/tweet'
import {GrapqlContext} from '../../interfaces'
import { getUserById } from '../../api/user'

const queries = {
    getAllTweets:async()=>await GetAllTweets(),
    getSignedURLForTweet:async(_:any,{imageType,imageName}:{imageType:string,imageName:string},ctx:GrapqlContext)=>{
        if(!ctx.user || !ctx.user.id) throw new Error("You are not authenticated!")
        const result = await GetSignedURlForTweet(imageType,imageName,ctx.user.id)
        return result
    }
}
const mutations = {
    createTweet:async(_:any,{content,imageUrl}:{content:string,imageUrl?:string},ctx:GrapqlContext)=>{
        if(!ctx.user || !ctx.user.id) throw new Error("You are not authenticated!")
        const result = await CreateTweet(ctx.user.id,content,imageUrl)
        return result;
    }
}
const extraResolvers = {
    Tweet:{
        author:async(parent:Tweet)=> await getUserById(parent.authorId)
    }
}
export const resolvers = {queries,mutations,extraResolvers}