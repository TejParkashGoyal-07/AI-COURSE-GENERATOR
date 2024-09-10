import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import EditCourse from './EditCourse';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../configs/firebaseConfig';
import { CourseList } from '../../../../configs/schema';
import { eq } from 'drizzle-orm';
function CourseBasicInfo({course,refreshData}) {
  const[selectedFile,setSelectedFile]=useState();
  const onFileSelected=async(event)=>{
    useEffect(()=>{
      if(course){
        setSelectedFile(course?.courseBanner)
      }
    },[course])
    const file=event.target.files[0];
    setSelectedFile(URL.createObjectURL(file))
    const fileName=Date.now()+".jpg"

    const storageRef=ref(storage,'ai-course/'+fileName);
    await uploadBytes(storageRef,file).then((snapshot)=>{
      console.log("Uploaded");
    }).then(resp=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
      console.log(downloadUrl);
      await db.update(CourseList).set({
        courseBanner:downloadUrl
      }).where(eq(CourseList.id,course?.id))
      })
    })


    

  }
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
            <h2 className='font-bold text-3xl'>{course?.courseOutput?.course?.name}<EditCourse course={course} refreshData={()=>refreshData(true)}/></h2>
            <p className='text-sm text-gray-400 mt-3 '>{course?.courseOutput?.course?.description}</p>
            <h2 className='font-medium mt-2 flex-gap-2 items-center text-primary'>
            <IoExtensionPuzzleOutline /> {course?.category}
            <Button className='w-full mt-5'>Start</Button>
            </h2>
        </div>
        <div>
          <label htmlFor='upload-image'>
            <Image src={selectedFile?selectedFile:"/placeholder.jpeg"} width={300} height={300} 
            className='w-full rounded-xl h-[250px] object-cover cursor-pointer'/>
            </label>
            <input type="file" id="upload image " className='opacity-0' onChange={onFileSelected}/>
        </div>

      </div>
    </div>
  )
}

export default CourseBasicInfo
