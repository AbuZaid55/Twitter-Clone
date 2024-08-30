"use client"
import React from 'react'
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginNSignupButton = () => {
  return (
    <div className="flex flex-col gap-3 pl-5 pt-7 w-fit">
        <Link href="/login" className="text-center border border-white rounded-full py-2 text-lg text-blue-500 font-semibold hover:bg-slate-900 transition-all">
          Log In
        </Link>
        <Link href="signup" className="text-center border border-white rounded-full py-2 text-lg text-blue-500 font-semibold hover:bg-slate-900 transition-all">
          Sign Up
        </Link>
        <p className="text-center">or</p>
        <button className="border border-white rounded-full py-2 px-10 text-lg bg-white text-slate-700 flex items-center gap-3 hover:bg-slate-200 transition-all">
          <FcGoogle className='text-2xl'/> Continue in with Google
        </button>
      </div>
  )
}

export default LoginNSignupButton
