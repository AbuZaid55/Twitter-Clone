"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { graphqlClient } from "@/client/graphqlClient";
import { Tweet } from "../../../gql/graphql";
import { notFound } from "next/navigation";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import { FollowUser, UnFollowUser } from "@/graphql/mutations/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const page = ({ params }: { params: { id: string } }) => {

  const { user,isLoading } = useGetUserById(params.id);
  const [formattedDate, setFormattedDate] = useState("");
  const { user: currentUser } = useCurrentUser();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleFollowUser = async () => {
    if (!user?.id) return;
    try {
      await graphqlClient.request(FollowUser, { to: user?.id });
      queryClient.invalidateQueries({queryKey:['user-by-id']})
      queryClient.invalidateQueries({queryKey:['current-user']})
      setIsFollowing(true);
    } catch (error: any) {
      toast.error(error?.response?.errors[0]?.message);
    }
  };

  const handleUnFollowUser = async () => {
    if (!user?.id) return;
    try {
      await graphqlClient.request(UnFollowUser, { to: user?.id });
      queryClient.invalidateQueries({queryKey:['user-by-id']})
      queryClient.invalidateQueries({queryKey:['current-user']})
      setIsFollowing(false);
    } catch (error: any) {
      toast.error(error?.response?.errors[0]?.message);
    }
  };

  useEffect(() => {
    if (!currentUser?.id) return;
    if (!user && !isLoading) notFound();
    const date = new Date(Number(user?.createdAt));
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    const exist = user?.followers?.some(
      (followers) => followers?.id === currentUser?.id
    );
    setFormattedDate(formattedDate);
    setIsFollowing(exist as boolean);
  }, [currentUser, user]);

  return (
    <div>
      <div className="flex items-center">
        <Link href="/" className="text-3xl p-4">
          <FaArrowLeftLong />
        </Link>
        <div>
          <h1 className="text-xl">{user?.name}</h1>
          <p className="text-slate-500">{user?.tweets?.length} Tweets</p>
        </div>
      </div>

      <div>
        <Image
          className="w-full h-full cursor-pointer"
          src="/banner.jpg"
          width={500}
          height={500}
          alt="Banner"
          priority
        />
      </div>
      <div className="relative p-4">
        <Image
          className="rounded-full absolute -top-[70px] border-2 border-black cursor-pointer"
          src={user?.avatar || "/profile.jpg"}
          width={140}
          height={140}
          alt="Profile"
          priority
        />
        {user?.id === currentUser?.id ? (
          <button className="py-2 px-4 border border-slate-500 absolute top-4 right-4 rounded-full hover:bg-slate-900">
            Edit profile
          </button>
        ) : (
          <div>
            {isFollowing ? (
              <button
                onClick={handleUnFollowUser}
                className="py-2 px-4 border bg-white absolute top-4 right-4 rounded-full text-slate-600 font-semibold"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={handleFollowUser}
                className="py-2 px-4 border bg-white absolute top-4 right-4 rounded-full text-slate-600 font-semibold"
              >
                Follow
              </button>
            )}
          </div>
        )}
        <div className="pt-[70px]">
          <h1 className="font-bold text-2xl text-center w-[140px]">
            {user?.name}
          </h1>
          <p className="flex items-center gap-2 text-slate-500">
            <FaCalendarAlt />
            Joined {formattedDate}
          </p>
          <p>
            <span>{user?.followings?.length}</span>
            <span className="text-slate-500 px-1">Following</span>
            <span className="pl-2">{user?.followers?.length}</span>
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
        {user?.tweets?.map((tweet: any) => (
          <PostCard key={tweet.id} tweet={tweet as Tweet} />
        ))}
      </div>
    </div>
  );
};

export default page;
