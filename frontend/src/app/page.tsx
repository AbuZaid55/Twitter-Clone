"use client"
import React from "react";
import MakePostCard from "@/components/MakePostCard";
import PostCard from "@/components/PostCard";
import { useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "../../gql/graphql";

export default function Home() {
  const {tweets=[]} = useGetAllTweets()
  return (
    <div>
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
}
