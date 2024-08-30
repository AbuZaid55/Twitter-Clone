import React from 'react'
import Image from "next/image";
import { RiGalleryLine } from "react-icons/ri";

const MakePostCard = () => {
  return (
    <div className="flex gap-5 p-5">
      <Image
        className="rounded-full h-fit w-fit"
        src="/profile.jpg"
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
          <input className="hidden" type="file" id="file"  />
          <button className="bg-blue-500 font-semibold px-10 py-2 rounded-full">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default MakePostCard
