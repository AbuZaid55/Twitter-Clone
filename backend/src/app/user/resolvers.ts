import { LognIn, signup } from "../../api/user"

interface Data{
    name: string,
    email: string,
    avatar?: string,
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
    }
}
export const resolvers = {mutations, queries}