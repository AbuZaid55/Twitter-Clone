import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req:NextRequest){
    const url = req.nextUrl
    const token = await getToken({req})
    const path = (url.pathname.startsWith('/signup') || url.pathname.startsWith('/login'))
    if(!token && !path){
        return NextResponse.redirect(new URL('/login',req.url))
    }
    if(token && path){
        return NextResponse.redirect(new URL('/',req.url))
    }
}

export const config = {
    matcher:['/','/login','/signup']
}