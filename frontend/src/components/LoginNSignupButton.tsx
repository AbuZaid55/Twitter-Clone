import React from 'react'
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginNSignupButton = () => {
  return (
    <div className="flex flex-col gap-3 pl-5 pt-7 w-fit">
        <Link href="/login" className="text-center border border-white rounded-full py-2 text-xl text-blue-500 font-semibold hover:bg-slate-900 transition-all">
          Log In
        </Link>
        <Link href="signup" className="text-center border border-white rounded-full py-2 text-xl text-blue-500 font-semibold hover:bg-slate-900 transition-all">
          Sign Up
        </Link>
        <p className="text-center">or</p>
        <button className="border border-white rounded-full py-2 px-16 text-xl bg-white text-slate-700 flex items-center gap-3 hover:bg-slate-200 transition-all">
          <FcGoogle /> Sign in with Google
        </button>
      </div>
  )
}

export default LoginNSignupButton
