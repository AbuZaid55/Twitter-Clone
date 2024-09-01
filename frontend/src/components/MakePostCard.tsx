import React from 'react'
import Image from "next/image";
import { RiGalleryLine } from "react-icons/ri";
import { useCurrentUser } from '@/hooks/user';

const MakePostCard = () => {
  const {user} = useCurrentUser()
  console.log(user)
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
          className="bg-transparent text-xl p-2 border-b w-full border-slate-500 resize-none no-scrollbar"
          rows={3}
          placeholder="What is happening?!"
        ></textarea>
        <div className="flex items-center justify-between">
          <label htmlFor="file" className="text-blue-500 cursor-pointer text-xl">
            <RiGalleryLine />
          </label>
          <input accept=".jpg, .jpeg, .png" className="hidden" type="file" id="file"  />
          <button className="bg-blue-500 font-semibold px-10 py-2 rounded-full">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default MakePostCard
