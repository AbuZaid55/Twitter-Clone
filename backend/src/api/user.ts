import { prisma } from "../client/db"

interface Data{
    name: string,
    email: string,
    avatar?: string,
    password: string
}
export const signup = async(data:Data)=>{
    const {name,email,password} = data
    if(!name || !email || !password){
        throw new Error("All filed are required!")
    }
    const isExist = await prisma.user.findUnique({where:{email:email}})
    if(isExist){
        throw new Error ("User already exist!")
    }
    await prisma.user.create({data:data})
    return "Sign up successfull"
}