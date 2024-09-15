import React from 'react'
import { CiClock2 } from "react-icons/ci";
function ChapterListCard({chapter,index}) {
  return (
    <div className='grid grid-cols-5 p-3 items-center border-b gap-5'>
       <div>
        <h2 className='p-2 bg-primary 
         w-8 text-center h-8 text-white rounded-full'>{index+1}</h2>
       </div>
       <div className='col-span-4'>
            <h2 className='font-medium'>{chapter?.name}</h2>
            <h2 className='text-primary flex items-center gap-2 text-sm'><CiClock2></CiClock2>{chapter?.duration}</h2>
       </div>
    </div>
  )
}

export default ChapterListCard