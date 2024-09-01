export interface SignUpPayload{
    name: string,
    email: string,
    avatar?: string,
    password: string
    confirm_pass: string
}
export interface JWTUser {
    id: string
    name: string
    email: string
    avatar: string | null
    createdAt: Date
}
export interface GrapqlContext {
    user?:JWTUser
}