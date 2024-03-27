import React from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci"

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute pl-12 bottom-1/4 text-white text-left w-3/4 '>
      <h1 className='text-3xl font-bold mb-2'>{title}</h1>
      <p>{overview}</p>
      <div className='flex gap-5 align-center items-center pt-3'>

          <button className='flex items-center gap-2'>{<FaCirclePlay size="46px"/>} Play</button>


          <button className='flex gap-1 bg-gray-400 h-11 items-center text-black px-6 py-2 rounded-md hover:bg-opacity-80 opacity-55'><CiCircleInfo size="34px" />More info</button>

      </div>
    </div>
  )
}

export default VideoTitle
