import { prisma } from '../client/db'
import { s3Client } from '../client/aws/s3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { redisClient } from '../client/redis'

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET


export const CreateTweet = async(userId:string,content:string,imageUrl?:string) => {
    const rateLimitFlag = await redisClient.get(`RATE_LIMIT_TWEET:${userId}`)
    if(rateLimitFlag) throw new Error("Please wait....")
    if(!content){
        throw new Error("Please write some content!")
    }
    const result = await prisma.tweet.create({data:{
        content: content,
        imageUrl: imageUrl,
        author: {connect:{id:userId}}
    }})
    await redisClient.setex(`RATE_LIMIT_TWEET:${userId}`,10,1)
    await redisClient.del(`All_TWEETS`)
    await redisClient.del(`USER_TWEETS:${userId}`)
    return result;
}

export const GetTweetsByAuthor = async(authorId:string)=>{
    const cachedValue = await redisClient.get(`USER_TWEETS:${authorId}`)
    if(cachedValue) return JSON.parse(cachedValue)
    const result = await prisma.tweet.findMany({where:{author:{id:authorId}},orderBy:{createdAt:"desc"}})
    await redisClient.set(`USER_TWEETS:${authorId}`,JSON.stringify(result))
    return result;
}

export const GetAllTweets = async()=>{
    const cachedValue = await redisClient.get('All_TWEETS')
    if(cachedValue) return JSON.parse(cachedValue)
    const result  = await prisma.tweet.findMany({orderBy:{createdAt:"desc"}})
    await redisClient.set(`All_TWEETS`,JSON.stringify(result))
    return result;
}

export const GetSignedURlForTweet = async(imageType:string,imageName:string,userId:string)=>{
    const allowedImageTypes = ['image/jpg','image/png','image/jpeg','image/webp','image/gif']
    if(!allowedImageTypes.includes(imageType)) throw new Error("Unsupported Image Type!")
    const commond = new PutObjectCommand({
        Bucket:AWS_S3_BUCKET,
        Key:`uploads/${userId}/tweets/${imageName}-${Date.now()}`
    })
    const signedUrl = await getSignedUrl(s3Client,commond,{expiresIn:3600})
    return signedUrl
}