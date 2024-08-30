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
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const isExist = await prisma.user.findUnique({where:{email:email}})
    if(isExist){
        return {status:400,message:"User already exist!"}
    }
    await prisma.user.create({data:{name,email,password:hashPassword,avatar}})
    return {status:200,message:"Sign up successfull"}
}

export const LognIn = async(email:string,password:string)=>{
    if(!email || !password){
        return {status:400,message:"All field are required!"}
    }
    if(password.length<8){ 
        return {status:400,message:"Password should be minimum of 8 characters"}
    }
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
}