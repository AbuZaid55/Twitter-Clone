"use client"
import { graphqlClient } from "@/client/graphqlClient";
import { signUp } from "@/graphql/mutations/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {toast} from 'react-toastify'

const page = () => {
  const router = useRouter()
  const [input,setInput] = useState({name:"",email:"",password:"",confirm_pass:"",avatar:""})
  const handleInput = (e:any)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = useCallback(async (e:any) => {
    e.preventDefault()
    try {
      const data= await graphqlClient.request(signUp,input)
      if(data?.signUp?.status!=200){
        toast.error(data.signUp.message)
      }else{
        toast.success(data.signUp.message)
        setInput({name:"",email:"",password:"",confirm_pass:"",avatar:""})
        router.push("/login")
      }
    } catch (error:any) {
      console.log(error)
    }
  },[input])
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full">
      <div className="text-blue-500 text-5xl">
        <FaTwitter />
      </div>
      <h1 className="font-semibold text-2xl my-5">Sign up To Twitter</h1>
      <form className="flex flex-col gap-2">
        <input
          className="bg-transparent border-b border-blue-500 py-2 px-1 text-xl"
          name="name"
          type="text"
          placeholder="Name"
          value={input.name}
          onChange={handleInput}
        />
        <input
          className="bg-transparent border-b border-blue-500 py-2 px-1 text-xl"
          name="email"
          type="email"
          placeholder="Email"
          value={input.email}
          onChange={handleInput}
        />
        <input
          className="bg-transparent border-b border-blue-500 py-2 px-1 text-xl"
          name="password"
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={handleInput}
        />
        <input
          className="bg-transparent border-b border-blue-500 py-2 px-1 text-xl"
          name="confirm_pass"
          type="password"
          placeholder="Confirm password"
          value={input.confirm_pass}
          onChange={handleInput}
        />
        <button
          onClick={submitForm}
          className="bg-blue-500 font-bold px-20 py-3 rounded-full mt-5"
        >
          Sign Up
        </button>
        <p className="text-center">or</p>
        <button className="border border-white rounded-full py-2 px-10 text-lg bg-white text-slate-700 flex items-center gap-3 hover:bg-slate-200 transition-all">
          <FcGoogle className="text-2xl" /> Continue in with Google
        </button>
      </form>
      <p className="mt-3">
        Already have an account?{" "}
        <Link className="text-blue-400" href="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default page;
