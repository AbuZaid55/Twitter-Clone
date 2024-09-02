"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useParams()
  return (
    <div>
      Welcome two profile
      <p>{params?.id}</p>
    </div>
  )
}

export default page
