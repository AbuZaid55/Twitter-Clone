import { prisma } from "../client/db"
import bcrypt from 'bcrypt'

interface Data{
    name: string,
    email: string,
    avatar?: string,
    password: string
    confirm_pass: string
}
export const signup = async(data:Data)=>{
    const {name,email,password, confirm_pass,avatar} = data
    if(!name || !email || !password || !confirm_pass){
        return {status:400,message:"All field are required!"}
    }
    if(password.length<8){
        return {status:400,message:"Password should be minimum of 8 characters"}
    }
    if(password!==confirm_pass){
        return {status:400,message:"Password doesn't match!"}
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const isExist = await prisma.user.findUnique({where:{email:email}})
        if(isExist){
            return {status:400,message:"User already exist!"}
        }
        await prisma.user.create({data:{name,email,password:hashPassword,avatar}})
        return {status:200,message:"Sign up successfull"}
    } catch (error:any) {
        return {status:400,message:error?.message}
    }
}

export const LognIn = async(email:string,password:string)=>{
    if(!email || !password){
        return {status:400,message:"All field are required!"}
    }
    if(password.length<8){ 
        return {status:400,message:"Password should be minimum of 8 characters"}
    }
    try {
        const isExist = await prisma.user.findUnique({where:{email:email}})
        if(!isExist){
            return {status:400,message:"Invalid email or password"}
        }
        const verifyPassword = await bcrypt.compare(password,isExist.password)
        if(!verifyPassword){
            return {status:400,message:"Invalid email or password"}
        }
        const {id,name,avatar,createdAt} = isExist
        return {status:200,message:"Login successfull",user:{id,name,email:isExist.email,avatar,createdAt}}
    } catch (error:any) {
        return {status:400,message:error?.message}
    }
}

export const ContinueWithGoogle = async(name:string,email:string,avatar:string)=>{
    if(!name || !email){
        return {status:400,message:"Name or Email not found!"}
    }
    try {
        const isExist = await prisma.user.findUnique({where:{email}})
        if(!isExist){
            const password = name+'_'+Date.now()+'_'+Math.floor(10000+Math.random()*90000)
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)
            const result = await prisma.user.create({data:{name,email,password:hashPassword,avatar}})
            return {status:200,message:"Google login or signup successfull",user:{id:result.id,name:result.name,email:result.email,avatar:result.avatar,createdAt:result.createdAt}}
        }
        return {status:200,message:"Google login or signup successfull",user:{id:isExist.id,name:isExist.name,email:isExist.email,avatar:isExist.avatar,createdAt:isExist.createdAt}}
    } catch (error:any) {
        return {status:400,message:error.message}
    }
}