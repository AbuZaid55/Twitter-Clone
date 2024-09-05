import React from 'react'
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { HiArrowUpTray } from "react-icons/hi2";
import { Tweet } from '../../gql/graphql';
import moment from 'moment'
import Link from 'next/link';

const PostCard = ({tweet}:{tweet:Tweet}) => {
  if(!tweet) return;
  const timeago = moment(Number(tweet.updatedAt)).fromNow()
  return (
    <div className="flex gap-5 p-5 border-t border-slate-500">
     <Link href={`/${tweet.author?.id}`}>
     <div className="h-12 w-12 relative">
     <Image
        className="rounded-full"
        src={tweet.author?.avatar || '/profile.jpg'}
        fill={true} 
        style={{ objectFit: 'cover' }}
        sizes="48px"
        alt="Pic"
        priority 
      />
     </div>
     </Link>
      <div className="w-full">
        <h1 className='font-semibold'><Link className='hover:border-b ' href={`/${tweet.author?.id}`}>{tweet.author?.name}</Link> <span className='font-extralight'> · {timeago}</span></h1>
        <p dangerouslySetInnerHTML={{__html:tweet.content}}></p>
        {tweet.imageUrl && <Image className='p-2' src={tweet.imageUrl} width={400} height={400} alt='Image' priority />} 
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

