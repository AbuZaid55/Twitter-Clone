import { prisma } from '../client/db'

export const CreateTweet = async(userId:string,content:string,imageUrl?:string) => {
    if(!content){
        throw new Error("Please write some content!")
    }
    const result = await prisma.tweet.create({data:{
        content: content,
        imageUrl: imageUrl,
        author: {connect:{id:userId}}
    }})
    return result;
}

export const getTweetsByAuthor = async(authorId:string)=>{
    const result = await prisma.tweet.findMany({where:{author:{id:authorId}}})
    return result;
}

export const GetAllTweets = async()=>{
    const result  = await prisma.tweet.findMany({orderBy:{createdAt:"desc"}})
    return result;
}