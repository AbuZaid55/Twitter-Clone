import { signup } from "../../api/user"

interface Data{
    name: string,
    email: string,
    avatar?: string,
    password: string
}

const queries = {
    sayHello:async(_:any,{token}:{token:string})=>token
}
const mutations = {
    signUp:async(_:any,data:Data)=>{
        const result = await signup(data)
        return result;
    }
}
export const resolvers = {mutations, queries}