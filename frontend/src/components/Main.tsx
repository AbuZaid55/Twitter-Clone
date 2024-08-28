import React from "react";
import MakePostCard from "./MakePostCard";
import PostCard from "./PostCard";

const Posts = () => {
  return (
    <div className="h-screen border-l border-r overflow-hidden overflow-y-scroll no-scrollbar border-slate-500">
        <MakePostCard/>
        <div>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    </div>
  );
};

export default Posts;
