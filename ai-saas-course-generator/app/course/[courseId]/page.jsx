import React, { useEffect } from 'react'
import {db} from "../../../configs/db"
import {CourseList} from "../../../configs/schema"
import { eq } from 'drizzle-orm'
import {CourseBasicInfo} from "../../../app/create-course/[courseId]/_components/CourseBasicInfo"
import Header from "../../../app/_components/Header"
import { useState } from 'react'
import {CourseDetails} from "../../../app/create-course/[courseId]/_components/CourseDetails"
import {ChaptersChart} from "../../../app/create-course/[courseId]/_components/ChaptersChart"
function Course({params}) {
    const[course,setCourse]=useState()
    useEffect(()=>{
        params&&GetCourse();
    },[params])
    const GetCourse=async()=>{
        const result=await db.select().from(CourseList).where(eq(CourseList?.courseId,params?.courseId))
        setCourse(result[0])
    }
  return (
    <div>
        <Header/>
        <div className="px-10 p-10 md:px-20 lg:px-44"> 
        <CourseBasicInfo course={course} edit={false}></CourseBasicInfo>
        <CourseDetails course={course}/>
        <ChaptersChart  edit ={false}course={course}/>
        </div>
    </div>
  )
}

export default Course