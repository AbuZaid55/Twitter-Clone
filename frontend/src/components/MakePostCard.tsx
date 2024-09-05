import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
import { RiGalleryLine } from "react-icons/ri";
import { useCurrentUser } from '@/hooks/user';
import { useCreateTweet } from '@/hooks/tweet';
import { graphqlClient } from '@/client/graphqlClient';
import { GetSignedUrlForTweet } from '@/graphql/queries/tweet';
import axios from 'axios';
import toast from 'react-hot-toast';

const MakePostCard = () => {
  const {user} = useCurrentUser()
  const [content,setContent] = useState('')
  const [file,setFile]=useState({type:''})
  const [selectedImageUrl,setSelectedImageUrl]=useState('')
  const [signedUrl,setSignedUrl] = useState('')
  const {mutate} = useCreateTweet({setContent,setSignedUrl,setFile,setSelectedImageUrl})

  const UploadImageOnS3 = async(_file:any)=>{
    const imageName = _file.name
    const imageType = _file.type 
    if(!imageName || !imageType) return "";
    toast.loading("Uploading Image",{id:"Uploading Image"})
    let _signedURl = signedUrl
    if(!_signedURl){
      try {
        const res = await graphqlClient.request(GetSignedUrlForTweet,{imageType,imageName})
        _signedURl = res.getSignedURLForTweet;
        setSignedUrl(_signedURl)
      } catch (error:any) {
        toast.error(error?.response?.errors[0]?.message, {id:"Uploading Image"})
        return ""
      }
    }
    try {
      await axios.put(_signedURl,_file,{headers:{'Content-Type':imageType}})
      const url = new URL(_signedURl)
      toast.success("Uploaded Image",{id:"Uploading Image"})
      return `${url.origin}${url.pathname}`
    } catch (error:any) {
      toast.error(error?.response?.data,{id:"Uploading Image"})
      return ""
    }
  }
  const handleCreateTweet = useCallback(async()=>{
    if(!content) {toast.error("Please write something!"); return;};
    const formattedContent = content.replace(/\n/g, '<br />');
    const imageUrl = await UploadImageOnS3(file)
    mutate({
      imageUrl:imageUrl,
      content:formattedContent
    })
  },[content,file,signedUrl])

  const handleFileInput = useCallback((e:any)=>{
    const _file = e.target.files[0]
    if(_file){
      const _imageUrl = URL.createObjectURL(_file)
      setFile(_file)
      setSelectedImageUrl(_imageUrl)
    }
  },[file,selectedImageUrl])

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
        {selectedImageUrl && <Image className='p-8' src={selectedImageUrl} width={400} height={400} alt='SelectedImage'/>}
        <div className="flex items-center justify-between">
          <label htmlFor="file" className="text-blue-500 cursor-pointer text-xl">
            <RiGalleryLine />
          </label>
          <input onChange={handleFileInput} accept=".jpg, .jpeg, .png, .gif" className="hidden" type="file" id="file"  />
          <button onClick={()=>{handleCreateTweet()}} className="bg-blue-500 font-semibold px-10 py-2 rounded-full">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default MakePostCard
