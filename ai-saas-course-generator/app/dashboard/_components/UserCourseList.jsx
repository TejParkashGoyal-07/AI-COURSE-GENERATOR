"use client"
import React, { useEffect, useState } from 'react'
import {CourseList} from "../../../configs/schema"
import {CourseCard} from "../_components/CourseCard"
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useContext } from 'react'
import { UserCourseListContext } from '../../_context/UserCourseListContext'
function UserCourseList() {
  const{user}=useUser();
  useEffect(()=>{
    user&&getUserCourses()
  },[user])
  const[courseList,setCourseList]=useState([])
  const{userCourseList,setuserCourseList}=useContext(UserCourseListContext)
  const getUserCourses=async()=>{
    
    const result=await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    setCourseList(result);
    setuserCourseList(result)
    
  }
  return (
    <div className='mt-10'>
      <h2 className='font-bold text-lg'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>

        {courseList?.length>0?courseList?.map((course,index)=>{
          <CourseCard course={course} key={index} refreshData={()=>getUserCourses()}/>
        })
      :<div>
        {[1,2,3,4,5].map((item,index)=>{
          <div key={index} className='w-full bg-slate-200 animate-pulse mt-5 rounded-lg h-[200px]'>

          </div>
        })}
      </div>
      }
      </div>
    </div>
  )
}

export default UserCourseList
