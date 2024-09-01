import { LognIn, signup, ContinueWithGoogle } from "../../api/user"
import { SignUpPayload } from "../../interfaces"



const queries = {
    logIn:async(_:any,{email,password}:{email:string,password:string})=>{
        const result = await LognIn(email,password)
        return result
    }
}
const mutations = {
    signUp:async(_:any,data:SignUpPayload)=>{
        const result = await signup(data)
        return result;
    },
    continueWithGoogle:async(_:any,{name,email,avatar}:{name:string,email:string,avatar:string})=>{
        const result = await ContinueWithGoogle(name,email,avatar)
        return result;
    }
}
export const resolvers = {mutations, queries}