"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const SetTokenToLocalStorage = () => {
  const {data}:{data:any} = useSession()
  useEffect(()=>{
    if(data?.user?.twitter_token){
      window.localStorage.setItem("twitter_token",data.user.twitter_token)
    }
  },[data])
  return (<></>)
}

export default SetTokenToLocalStorage
