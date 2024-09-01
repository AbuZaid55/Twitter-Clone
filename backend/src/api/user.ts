import { prisma } from "../client/db"
import bcrypt from 'bcrypt'
import JWTService from "../services/jwt"
import { SignUpPayload } from "../interfaces"

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
    const result = await prisma.user.findUnique({where:{id:id},select:{
        id:true,
        name:true,
        email:true,
        avatar:true,
        createdAt:true
    }})
    return result;
}