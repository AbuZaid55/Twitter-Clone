import { LognIn, signup, ContinueWithGoogle } from "../../api/user"

interface Data{
    name: string,
    email: string,
    avatar: string,
    password: string,
    confirm_pass: string
}

const queries = {
    logIn:async(_:any,{email,password}:{email:string,password:string})=>{
        const result = await LognIn(email,password)
        return result
    }
}
const mutations = {
    signUp:async(_:any,data:Data)=>{
        const result = await signup(data)
        return result;
    },
    continueWithGoogle:async(_:any,{name,email,avatar}:{name:string,email:string,avatar:string})=>{
        const result = await ContinueWithGoogle(name,email,avatar)
        return result;
    }
}
export const resolvers = {mutations, queries}