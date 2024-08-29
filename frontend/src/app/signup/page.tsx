import Link from 'next/link';
import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen w-full'>
      <div className='text-blue-500 text-5xl'><FaTwitter/></div>
      <h1 className='font-semibold text-2xl my-5'>Sign up To Twitter</h1>
      <form className='flex flex-col gap-2'>
      <input className='bg-transparent border-b border-blue-500 py-2 px-1 text-xl' type="text" placeholder='Name' />
      <input className='bg-transparent border-b border-blue-500 py-2 px-1 text-xl' type="email" placeholder='Email' />
      <input className='bg-transparent border-b border-blue-500 py-2 px-1 text-xl' type="password" placeholder='Password' />
      <input className='bg-transparent border-b border-blue-500 py-2 px-1 text-xl' type="password" placeholder='Confirm password' />
      <button className="bg-blue-500 font-bold px-20 py-3 rounded-full mt-5">Sign Up</button>
      <p className="text-center">or</p>
        <button className="border border-white rounded-full py-2 px-10 text-lg bg-white text-slate-700 flex items-center gap-3 hover:bg-slate-200 transition-all">
          <FcGoogle className='text-2xl'/> Continue in with Google
        </button>
      </form>
      <p className='mt-3'>Already have an account? <Link className='text-blue-400' href="/login">Log In</Link></p>
    </div>
  )
}

export default page
