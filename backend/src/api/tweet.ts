import { prisma } from '../client/db'
import { s3Client } from '../client/aws/s3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET


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

export const GetTweetsByAuthor = async(authorId:string)=>{
    const result = await prisma.tweet.findMany({where:{author:{id:authorId}}})
    return result;
}

export const GetAllTweets = async()=>{
    const result  = await prisma.tweet.findMany({orderBy:{createdAt:"desc"}})
    return result;
}

export const GetSignedURlForTweet = async(imageType:string,imageName:string,userId:string)=>{
    const allowedImageTypes = ['image/jpg','image/png','image/jpeg','image/webp','image/gif']
    if(!allowedImageTypes.includes(imageType)) throw new Error("Unsupported Image Type!")
    const commond = new PutObjectCommand({
        Bucket:AWS_S3_BUCKET,
        Key:`uploads/${userId}/tweets/${imageName}-${Date.now()}.${imageType}`
    })
    const signedUrl = await getSignedUrl(s3Client,commond,{expiresIn:3600})
    return signedUrl
}