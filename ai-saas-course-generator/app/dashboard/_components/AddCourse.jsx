'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import{Button} from '../../../components/ui/button'
import Link from 'next/link';
function AddCourse() {
    const {user}=useUser();
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h2 className='text-3xl'>
            Hello,<span className='font-bold'>{user?.fullName}</span>
            <p className='text-sm text-gray-500'>Create A new Course with AI,SHare With Friends and earn from it </p>
        </h2>
      </div>
      <Link href={"/create-course"}>
      <Button>+ Create AI Course</Button>
      </Link>
    </div>
  )
}

export default AddCourse
