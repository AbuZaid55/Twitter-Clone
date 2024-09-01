import React from 'react'
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { HiArrowUpTray } from "react-icons/hi2";
import { Tweet } from '../../gql/graphql';
import moment from 'moment'

const PostCard = ({tweet}:{tweet:Tweet}) => {
  const timeago = moment(Number(tweet.updatedAt)).fromNow()
  return (
    <div className="flex gap-5 p-5 border-t border-slate-500">
      <Image
        className="rounded-full h-12 w-12 object-cover"
        src={tweet.author?.avatar || '/profile.jpg'}
        width={34}
        height={34}
        alt="Pic"
      />
      <div className="w-full">
        <h1 className='font-semibold'>{tweet.author?.name} <span className='font-extralight'> · {timeago}</span></h1>
        <p dangerouslySetInnerHTML={{__html:tweet.content}}></p>
        <div className='flex items-center justify-between mt-3 text-lg'>
            <FiMessageCircle className=' cursor-pointer hover:text-blue-500 transition-all'/>
            <BiRepost className=' cursor-pointer hover:text-blue-500 transition-all'/>
            <FaRegHeart className=' cursor-pointer hover:text-red-500 transition-all'/>
            <HiArrowUpTray className=' cursor-pointer hover:text-blue-500 transition-all'/>
        </div>
      </div>
    </div>
  )
}

export default PostCard

