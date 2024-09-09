"use client";
import React, { useState, useEffect } from "react";
import { CourseList } from "../../../configs/schema";
import { eq, and } from "drizzle-orm"; // added 'and' to match your query usage
import { useUser } from "@clerk/nextjs";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChaptersChart from "./_components/ChaptersChart";
// Assuming Button is either a custom or a library component, import it
import { Button } from "your-button-library"; // Replace with the actual path

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const[loading,setLaoding]=useState(true)
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
  const generateChapterContent = async() => {
    const chapters = course?.courseOutput?.course?.chapters;
    chapters.forEach((chapter, index) => {
      const PROMPT = `Explain the concept in Detail On Topic: ${course?.name}, Chapter: ${chapter?.name} in JSON format with list of an array fields as title, description,explanation on chapter
                      detail, code example (code field in <precode>
                        format) if applicable.`;
      if(index<20){
        try {
          const result=await.GenerateChapterContent_AI.sendMessage(PROMPT);
          console.log(result?.response?.text());
  
          setLaoding(false)
        } catch (e) {
          console.log(e);
        }
      }
    })
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={GetCourse} />

      {/* Course Details */}
      <CourseDetails course={course} />

      {/* List of Sessions */}
      <ChaptersChart course={course} refreshData={GetCourse} />

      {/* Generate Button */}
      <Button className="my-10" onClick={generateChapterContent}>Generate Course Layout</Button>
    </div>
  );
}

export default CourseLayout;
