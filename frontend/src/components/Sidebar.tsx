"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiBell, BiHash, BiHomeCircle, BiMessageMinus } from "react-icons/bi";
import { RxBookmark } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { TwitterSidebarButton } from "@/interfaces";
import { useCurrentUser } from "@/hooks/user";
import Link from "next/link";

const Sidebar = () => {
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef<HTMLSpanElement | null>(null)
  const {user:userData} = useCurrentUser()
  const sidebarItem: TwitterSidebarButton[] = useMemo(()=>[
    {
      title: "Home",
      icon: <BiHomeCircle />,
      link:"/"
    },
    {
      title: "Explore",
      icon: <BiHash />,
      link:"/"
    },
    {
      title: "Notifications",
      icon: <BiBell />,
      link:"/"
    },
    {
      title: "Messages",
      icon: <BiMessageMinus />,
      link:"/"
    },
    {
      title: "Bookmarks",
      icon: <RxBookmark />,
      link:"/"
    },
    {
      title: "Profile",
      icon: <FaRegUser />,
      link:`/${userData?.id}`
    }, {
      title: "More",
      icon: <MdMoreHoriz />,
      link:"/"
    },
  ],[userData])
  
  const handleClickOutSide = (e:any) =>{
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setShowButton(false);
    }
  }
  const logOut = ()=>{
    signOut()
    window.localStorage.removeItem('twitter_token')
  }
  useEffect(()=>{
    if(!showButton) return
    window.addEventListener('mousedown',handleClickOutSide)
    return () => {
      window.removeEventListener("mousedown",handleClickOutSide)
    }
  },[showButton])

  return (
    <div className="flex justify-end h-screen relative">
      <div className="pr-20 pt-5">

        <div className="text-3xl hover:bg-slate-900 w-fit p-3 rounded-full cursor-pointer transition-all">
          <FaTwitter />
        </div>

        {sidebarItem.map((item, i) => (
          <Link href={item.link} className="flex items-center text-xl gap-2 mt-3 hover:bg-slate-800 w-fit px-4 py-2 rounded-full transition-all" key={i}>
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}

        <button className="bg-blue-500 font-bold px-20 py-3 rounded-full mt-5">Post</button>

        <div className="flex items-center gap-5 absolute bottom-2 mb-2 mr-5 bg-slate-800 px-6 py-3 rounded-full text-xl">
          <Image className="rounded-full" src={(userData?.avatar)?userData.avatar:'/profile.jpg'} width={40} height={40} alt="Pic" priority />

          <h1 className=" h-8 overflow-hidden">{userData?.name}</h1>

          <span ref={buttonRef}><MdMoreHoriz onClick={()=>{setShowButton(!showButton)}} className="text-3xl cursor-pointer"/>

            <button onClick={logOut} className={`${(showButton)?"":"hidden"} absolute -top-7 right-2 border py-2 px-4 rounded-md border-slate-500 bg-slate-800 hover:bg-slate-900  transition-all`}>Log Out</button>

          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
