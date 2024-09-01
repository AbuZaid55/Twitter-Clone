"use client"
import React from "react";
import MakePostCard from "./MakePostCard";
import PostCard from "./PostCard";
import { useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "../../gql/graphql";

const Posts = () => {
  const {tweets=[]} = useGetAllTweets()
  return (
    <div className="h-screen border-l border-r overflow-hidden overflow-y-scroll no-scrollbar border-slate-500">
        <MakePostCard/>
        <div>
            {
              tweets?.map((tweet)=>(
                tweets?<PostCard key={tweet?.id} tweet={tweet as Tweet}/>:null
              ))
            }
        </div>
    </div>
  );
};

export default Posts;
