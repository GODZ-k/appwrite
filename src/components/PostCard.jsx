import React from 'react'
import appWriteService from "../appwrite/config"
import { Link, useNavigate } from 'react-router-dom'


function PostCard({$id , title , feturedImage}) {
    const navigate = useNavigate()
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appWriteService.previewFile(feturedImage)} alt={title}
            className='rounded-xl' />

        </div>
        <h2
        className='text-xl font-bold'>{title}</h2>
    </div>
</Link>
  )
}

export default PostCard