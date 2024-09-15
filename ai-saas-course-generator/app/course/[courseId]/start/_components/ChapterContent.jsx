import React from 'react'
import YouTube from 'react-youtube'
const opts={
    height:'390',
    width:'640',
    playerVars:{
        autoPlay:0
    }
}
function ChapterContent({chapter,content}) {
  return (
    <div className=' p-10'>
        <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
        <p className='text-gray-500'>{chapter?.about}</p>

        {/* video */}
        <div className='flex justify-center my-6'>
        <YouTube
        videoId={content?.videoId} opts={opts}
        />
        </div>
        <div>
            {content?.content?.map((item,index)=>(
                
            ))}
        </div>
        

        {/* content */}
        </div>
  )
}

export default ChapterContent 