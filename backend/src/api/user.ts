import { prisma } from "../client/db"
import bcrypt from 'bcrypt'
import JWTService from "../services/jwt"
import { SignUpPayload } from "../interfaces"
import { User } from "@prisma/client"
import { redisClient } from "../client/redis"

export const signup = async(data:SignUpPayload)=>{
    const {name,email,password, confirm_pass,avatar} = data
    if(!name || !email || !password || !confirm_pass){
        throw new Error("All field are required!")
    }
    if(password.length<8){
        throw new Error("Password should be minimum of 8 characters")
    }
    if(password!==confirm_pass){
        throw new Error("Password doesn't match!")
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const isExist = await prisma.user.findUnique({where:{email:email}})
    if(isExist){
        throw new Error("User already exist!")
    }
    await prisma.user.create({data:{name,email,password:hashPassword,avatar}})
    return "Sing up successfull"
}

export const LognIn = async(email:string,password:string)=>{
    if(!email || !password){
        throw new Error("All field are required!")
    }
    if(password.length<8){ 
        throw new Error("Password should be minimum of 8 characters")
    }
    const isExist = await prisma.user.findUnique({where:{email:email}})
    if(!isExist){
        throw new Error("Invalid email or password")
    }
    const verifyPassword = await bcrypt.compare(password,isExist.password)
    if(!verifyPassword){
        throw new Error("Invalid email or password!")
    }
    const token = JWTService.generateToken(isExist)
    return token
}

export const ContinueWithGoogle = async(name:string,email:string,avatar:string)=>{
    if(!name || !email){
        throw new Error("Name or Email not found!")
    }
    const isExist = await prisma.user.findUnique({where:{email}})
    if(!isExist){
        const password = name+'_'+Date.now()+'_'+Math.floor(10000+Math.random()*90000)
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const result = await prisma.user.create({data:{name,email,password:hashPassword,avatar}})
        const token = JWTService.generateToken(result)
        return token
    }
    const token = JWTService.generateToken(isExist)
    return token;
}
export const getUserById = async(id:string)=>{
    if(!id){
        throw new Error("User id not found!")
    }
    const cachedValue = await redisClient.get(`USER:${id}`)
    if(cachedValue) return JSON.parse(cachedValue)
    const result = await prisma.user.findUnique({where:{id:id},select:{
        id:true,
        name:true,
        email:true,
        avatar:true,
        createdAt:true
    }})
    if(!result){
        throw new Error("User does not exist!")
    }
    await redisClient.set(`USER:${id}`,JSON.stringify(result))
    return result;
}

export const FollowUser = async(from:string,to:string)=>{
    if(!from || !to) throw new Error("Id not found!")
     await prisma.follows.create({
        data:{
            follower:{connect:{id:from}},
            following:{connect:{id:to}}
        }
    })
    await redisClient.del(`RECOMMENDED_USERS:${from}`)
    await redisClient.del(`USER_FOLLOWINGS:${from}`)
    await redisClient.del(`USER_FOLLOWERS:${to}`)
    return true
}
export const UnFollowUser = async(from:string,to:string)=>{
    if(!from || !to) throw new Error("Id not found!")
    await prisma.follows.delete({
        where:{
            followerId_followingId:{
                followerId:from,
                followingId:to
            }
        }
    })
    await redisClient.del(`RECOMMENDED_USERS:${from}`)
    await redisClient.del(`USER_FOLLOWINGS:${from}`)
    await redisClient.del(`USER_FOLLOWERS:${to}`)
    return true;
}

export const GetFollowers = async(id:string) =>{
    const cachedValue = await redisClient.get(`USER_FOLLOWERS:${id}`)
    if(cachedValue) return JSON.parse(cachedValue)
    const data = await prisma.follows.findMany({
        where:{
            following:{id:id}
        },
        include:{
            follower:true
        }
    })
    const result =  data.map((el)=>el.follower)
    await redisClient.set(`USER_FOLLOWERS:${id}`,JSON.stringify(result))
    return result;
}
export const GetFollowing = async(id:string)=>{
    const cachedValue = await redisClient.get(`USER_FOLLOWINGS:${id}`)
    if(cachedValue) return JSON.parse(cachedValue)
    const data =  await prisma.follows.findMany({
        where:{
            follower:{id:id}
        },
        include:{
            following:true,
        }
    })
    const result =  data.map((el)=>el.following)
    await redisClient.set(`USER_FOLLOWINGS:${id}`,JSON.stringify(result))
    return result
}
export const GetRecommonedUser = async(id:string)=>{
    const cachedValue = await redisClient.get(`RECOMMENDED_USERS:${id}`)
    if(cachedValue) return JSON.parse(cachedValue)
    let list:User[] = []
    const result = await prisma.follows.findMany({
        where:{follower:{id:id}},
        include:{following:{include:{followings:{include:{following:true}}}}}
    })
    result.map((MyFollowing)=>{
        MyFollowing.following.followings.map((followingOfMyFollowing)=>{
            if(followingOfMyFollowing.followingId!=id && result.findIndex((e)=>e.followingId===followingOfMyFollowing.followingId)<0){
                list.push(followingOfMyFollowing.following)
            }
        })
    })
    await redisClient.set(`RECOMMENDED_USERS:${id}`,JSON.stringify(list))   
    return list
}