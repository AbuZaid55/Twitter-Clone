import React, { useCallback, useState } from 'react'
import Image from "next/image";
import { RiGalleryLine } from "react-icons/ri";
import { useCurrentUser } from '@/hooks/user';
import { useCreateTweet } from '@/hooks/tweet';

const MakePostCard = () => {
  const {user} = useCurrentUser()
  const {mutate} = useCreateTweet()
  const [content,setContent] = useState('')
  const handleCreateTweet = useCallback(()=>{
    const formattedContent = content.replace(/\n/g, '<br />');
    mutate({
      content:formattedContent
    })
    setContent('')
  },[content])
  return (
    <div className="flex gap-5 p-5">
      <Image
        className="rounded-full h-12 w-12 object-cover"
        src={user?.avatar || "/profile.jpg"}
        width={34}
        height={34}
        alt="Pic"
      />
      <div className="w-full">
        <textarea
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          className="bg-transparent text-xl p-2 border-b w-full border-slate-500 resize-none no-scrollbar"
          rows={3}
          placeholder="What is happening?!"
        ></textarea>
        <div className="flex items-center justify-between">
          <label htmlFor="file" className="text-blue-500 cursor-pointer text-xl">
            <RiGalleryLine />
          </label>
          <input accept=".jpg, .jpeg, .png" className="hidden" type="file" id="file"  />
          <button onClick={()=>{handleCreateTweet()}} className="bg-blue-500 font-semibold px-10 py-2 rounded-full">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default MakePostCard
