import React, { useCallback, useState } from 'react'
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
  const {mutate} = useCreateTweet()
  const [content,setContent] = useState('')
  const [file,setFile]=useState({type:''})
  const [selectedImageUrl,setSelectedImageUrl]=useState('')

  const getSignedURL = async(_file:any)=>{
    const imageType = _file.type
    const imageName = _file.name
    if(!imageName || !imageType) return ""
    toast.loading("Uploading Image",{id:"Uploading Image"})
    try {
      const signedUrl = await graphqlClient.request(GetSignedUrlForTweet,{imageType,imageName})
      return signedUrl.getSignedURLForTweet;
    } catch (error:any) {
      toast.error(error?.response?.errors[0]?.message, {id:"Uploading Image"})
      return ""
    }
  }

  const uploadImageOnS3 = async(signedURL:string)=>{
    if(!signedURL) return ""
    await axios.put(signedURL,file,{headers:{'Content-Type':file?.type}})
    const url = new URL(signedURL)
    toast.success("Uploaded Image",{id:"Uploading Image"})
    return `${url.origin}${url.pathname}`
  }

  const handleCreateTweet = useCallback(async()=>{
    if(!content) {toast.error("Please write something!"); return;};
    const formattedContent = content.replace(/\n/g, '<br />');
    const signedUrl = await getSignedURL(file)
    const imageUrl = await uploadImageOnS3(signedUrl)
    mutate({
      imageUrl:imageUrl,
      content:formattedContent
    })
    setContent('')
    setFile({type:''})
    setSelectedImageUrl('')
  },[content,file])

  const handleFileInput = (e:any)=>{
    const _file = e.target.files[0]
    if(_file){
      const _imageUrl = URL.createObjectURL(_file)
      setFile(_file)
      setSelectedImageUrl(_imageUrl)
    }
  }
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
