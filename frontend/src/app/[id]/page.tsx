import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { graphqlClient } from "@/client/graphqlClient";
import { GetUserById } from "@/graphql/queries/user";
import { Tweet } from "../../../gql/graphql";
import { notFound } from "next/navigation";

const getUserInfo = async(id:string)=>{
  try {
    const userInfo = await graphqlClient.request(GetUserById, { id:id });
    return userInfo.getUserById
  } catch (error) {
    console.log(error)
  }
}

const page = async ({ params }: { params: { id: string } }) => {
  
  const user = await getUserInfo(params?.id)
  if(!user) notFound()
  const date = new Date(user.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return (
    <div>
      <div className="flex items-center">
        <Link href="/" className="text-3xl p-4">
          <FaArrowLeftLong />
        </Link>
        <div>
          <h1 className="text-xl">{user.name}</h1>
          <p className="text-slate-500">{user.tweets?.length} Tweets</p>
        </div>
      </div>

      <div>
        <Image
          className="w-full h-full cursor-pointer"
          src="/banner.jpg"
          width={500}
          height={500}
          alt="Banner"
        />
      </div>
      <div className="relative p-4">
        <Image
          className="rounded-full absolute -top-[70px] border-2 border-black cursor-pointer"
          src={user.avatar || "/profile.jpg"}
          width={140}
          height={140}
          alt="Profile"
        />
        <button className="py-2 px-4 border border-slate-500 absolute top-4 right-4 rounded-full hover:bg-slate-900">
          Edit profile
        </button>
        <div className="pt-[70px]">
          <h1 className="font-bold text-2xl text-center w-[140px]">
            {user.name}
          </h1>
          <p className="flex items-center gap-2 text-slate-500">
            <FaCalendarAlt />
            Joined {formattedDate}
          </p>
          <p>
            <span>139</span>
            <span className="text-slate-500 px-1">Following</span>
            <span className="pl-2">10</span>
            <span className="text-slate-500 px-1">Followers</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-slate-500 px-2">
        <span className="border-b-4 border-blue-500 p-1 cursor-pointer">
          Posts
        </span>
        <span className="text-slate-500 p-1 cursor-pointer">Replies</span>
        <span className="text-slate-500 p-1 cursor-pointer">Highlights</span>
        <span className="text-slate-500 p-1 cursor-pointer">Articles</span>
        <span className="text-slate-500 p-1 cursor-pointer">Media</span>
        <span className="text-slate-500 p-1 cursor-pointer">Likes</span>
      </div>

      <div>
        {user.tweets?.map((tweet) => (
          <PostCard tweet={tweet as Tweet} />
        ))}
      </div>
    </div>
  );
};

export default page;
