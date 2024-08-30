"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const page = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const router = useRouter();
  const submitForm = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: input.email,
        password: input.password,
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full">
      <div className="text-blue-500 text-5xl">
        <FaTwitter />
      </div>
      <h1 className="font-semibold text-2xl my-5">Log in To Twitter</h1>
      <form className="flex flex-col gap-2">
        <input
          value={input.email}
          onChange={(e) => {
            setInput({ ...input, email: e.target.value });
          }}
          className="bg-transparent border-b border-blue-500 py-2 px-1 text-xl"
          type="email"
          placeholder="Email"
        />
        <input
          value={input.password}
          onChange={(e) => {
            setInput({ ...input, password: e.target.value });
          }}
          className="bg-transparent border-b border-blue-500 py-2 px-1 text-xl"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={submitForm}
          className="bg-blue-500 font-bold px-20 py-3 rounded-full mt-5"
        >
          Log In
        </button>
        <p className="text-center">or</p>
        <button className="border border-white rounded-full py-2 px-10 text-lg bg-white text-slate-700 flex items-center gap-3 hover:bg-slate-200 transition-all">
          <FcGoogle className="text-2xl" /> Continue in with Google
        </button>
      </form>
      <p className="mt-3">
        Don't have an account?{" "}
        <Link className="text-blue-400" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default page;
