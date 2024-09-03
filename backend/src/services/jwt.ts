import JWT from 'jsonwebtoken'
import { User } from '@prisma/client'
import { JWTUser } from '../interfaces'

const JWT_SECRET = process.env.JWT_SECRET || ''


class JWTService {
    public static generateToken(user:User){
        const payload:JWTUser = {
            id:user.id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            createdAt:user.createdAt
        }
        return JWT.sign(payload,JWT_SECRET,{expiresIn:"20d"})
    } 
    public static decondeToken (token:string){ 
        try {
            return JWT.verify(token,JWT_SECRET) as JWTUser
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;