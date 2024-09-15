"use client"
import React, { useEffect, useState } from 'react'
import { Chapters, CourseList } from '../../../../configs/schema'
import { eq } from 'drizzle-orm'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { db } from '../../../../@/configs/db'

function CourseStart({ params }) {
    const [course, setCourse] = useState([])
    const [selectedChapter, setSelectedChapter] = useState()
    const[ChapterContent,setChapterContent]=useState();

    useEffect(() => {
        GetCourse()
    }, [])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))
        setCourse(result[0])
        getChapterSelectedContent(0)
    }

    const getChapterSelectedContent = async(chapterid) => {
        const result=await db.select().from(Chapters).where(and(eq(Chapters.chapterId,chapterid),eq(Chapters.courseid,course?.courseid)))
        setChapterContent(result[0])
    }

    return (
        <div>
            {/* SideBar */}
            <div className=' fixed md:w-72 hidden md:block h-screen bg-blue-50 border-r shadow-sm'>
                <h2 className='font-medium text-lg bg-primary p-3 text-white'>
                    {course?.courseOutput?.course?.name}
                </h2>
                <div>
                    {course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.name === chapter?.name ? "bg-purple-100" : ""}`}
                            onClick={() => { setSelectedChapter(chapter); getChapterSelectedContent(index); }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='md:ml-64'>
                {/* Content based on selectedChapter */}
                <ChapterContent chapter={selectedChapter} content={ChapterContent} />
            </div>
        </div>
    )
}

export default CourseStart
