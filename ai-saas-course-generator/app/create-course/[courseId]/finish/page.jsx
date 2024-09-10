"use client"
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { CourseList } from '../../../../configs/schema';
import CourseBasicInfo from '../_components/CourseBasicInfo';

function FinishScreen({params}) {
    const { user } = useUser();
    const router = useRouter();
    const [course, setCourse] = useState([]);
    const [loading, setLaoding] = useState(true)
    useEffect(() => {
        if (params && user) {
            GetCourse();
        }
    }, [params, user]);

    const GetCourse = async () => {
        try {
            const result = await db
                .select()
                .from(CourseList)
                .where(
                    and(
                        eq(CourseList.courseId, params?.courseId),
                        eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );

            setCourse(result[0]);
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    };
    return (

        <div className='px-10 md:px-20  lg:px-44 my-7'>
            <h2 className='text-center font-bold text-2xl my-3'>Congrats!Your Course is Ready</h2>

            <h2>{}</h2>
            <CourseBasicInfo course={course}refreshData={()=>console.log(result)}/>
        </div>
    )
}

export default FinishScreen