import { Tweet } from '@prisma/client'
import { CreateTweet } from '../../api/tweet'
import {GrapqlContext} from '../../interfaces'
import { getUserById } from '../../api/user'
const queries = {

}
const mutations = {
    createTweet:async(_:any,{content,imageUrl}:{content:string,imageUrl?:string},ctx:GrapqlContext)=>{
        if(!ctx.user){
            throw new Error("You are not authenticated!")
        }
        const userId = ctx.user.id
        const result = await CreateTweet(userId,content,imageUrl)
        return result;
    }
}
const extraResolvers = {
    Tweet:{
        author:async(parent:Tweet)=> await getUserById(parent.authorId)
    }
}
export const resolvers = {queries,mutations,extraResolvers}