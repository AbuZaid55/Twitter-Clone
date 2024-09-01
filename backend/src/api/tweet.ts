import { prisma } from '../client/db'

export const CreateTweet = async(userId:string,content:string,imageUrl?:string) => {
    try {
        const result = await prisma.tweet.create({data:{
            content: content,
            imageUrl: imageUrl,
            author: {connect:{id:userId}}
        }})
        return result;
    } catch (error:any) {
        return error?.message
    }
}