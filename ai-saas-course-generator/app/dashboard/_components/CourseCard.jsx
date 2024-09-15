"use client"
import React from 'react'
import Image from "next/image"
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropDownOptions from './DropDownOptions';
import {db} from "../../../configs/db"
import { CourseList } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
 
function CourseCard({course,refreshData}) {
    const deleteCourse=async()=>{
        const resp=await db.delete(CourseList).where(eq(CourseList.id,course?.id))
        .returning({id:CourseList?.id})
        if(resp){
            refreshData()
        }
    }
  return (
    <div className='shadow-sm rounded-lg flex flex-col gap-1 border p-2 hover:scale-105 transition-all'>
      <Link href={'/course/'+course?.courseId}>
     <Image src={course?.courseBanner} width={300} height={200}
     className='w-full h-[200px] object-cover  rouned-lg'
     ></Image>
     </Link>
     <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseoutput?.course?.name}
        <DropDownOptions deleteCourse={()=>deleteCourse()}><HiMiniEllipsisVertical/></DropDownOptions>
        </h2>
        <p className='text-sm  text-gray-400'>{course?.category}</p>
        <div className='flex items-center justify-between'>
            <h2 className='flex gap-2 items-centerp-1 bg-purple-50 text-sm rounded-sm text-primary'><HiOutlineBookOpen />{course?.courseOutput?.course?.numberOfChapters}Chapters</h2>
            <h2 className='text-sm bg-purple text-primary p-1 rounded-sm'>{course?.level}</h2>
        </div>
     </div>
    </div>
  )
}

export default CourseCard
