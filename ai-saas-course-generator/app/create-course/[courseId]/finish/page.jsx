"use client"
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { CourseList } from '../../../../configs/schema';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import CourseBasicInfo from '../_components/CourseBasicInfo';

function FinishScreen({ params }) {
    const { user } = useUser();
    const router = useRouter();
    const [course, setCourse] = useState([]);
    const [loading, setLaoding] = useState(true);

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
        <div className='px-10 md:px-20 lg:px-44 my-7'>
            <h2 className='text-center text-gray-400 border p-2 rounded flex-gap-5 items-center'>
                {`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`}
                <HiOutlineClipboardCheck 
                    className='h-6 w-6 cursor-pointer' 
                    onClick={async () => 
                        await navigator.clipboard.writeText(
                            `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`
                        )
                    }
                />
            </h2>
        </div> 
    );
}

export default FinishScreen;
