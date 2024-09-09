"use client";
import React, { useContext, useEffect, useState } from 'react';
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from "react-icons/hi2";
import { Button } from '../../components/ui/button';
import Category from "../create-course/_components/Category";
import { v4 as uuidv4 } from 'uuid';
import TopicDescription from "../create-course/_components/TopicDescription";
import SelectOption from "../create-course/_components/SelectOption";
import LodingDialogue from './_components/LodingDialogue';
import db from "../../configs/db"
import { UserInputContext } from '../_context/UserInputContext';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateCourse() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const { user } = useUser();

    // Stepper options
    const StepperOptions = [
        {
            id: 1,
            name: "Category",
            icon: <HiMiniSquares2X2 />,
        },
        {
            id: 2,
            name: "Topic & Desc",
            icon: <HiLightBulb />,
        },
        {
            id: 3,
            name: "Options",
            icon: <HiClipboardDocumentCheck />,
        },
    ];

    // Check button status based on activeIndex and userCourseInput
    const checkStatus = () => {
        // Check if category is selected
        if (activeIndex === 0 && (!userCourseInput?.Category || userCourseInput.Category.length === 0)) {
            return false;
        }
        // Check if topic is selected
        if (activeIndex === 1 && (!userCourseInput?.topic || userCourseInput.topic.length === 0)) {
            return true;
        }
        return false;
    };

    // Update the selected category in the global context
    const handleCategorySelect = (category) => {
        setUserCourseInput((prevState) => ({
            ...prevState,
            Category: category
        }));
    };

    // Save course layout to the database
    const saveCourseLayoutToDb = async (courseLayout) => {
        setLoading(true);
        const id = uuidv4();
        // Simulate saving the course layout to the DB
        const result = await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.topic,
            level: userCourseInput?.level,
            category: userCourseInput?.Category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl
        });
        router.replace('/create-course/' + id);
        setLoading(false);
    };

    // Generate course layout based on input and save it
    const GenerateCourseLayout = async () => {
        setLoading(true);
    
        const BASIC_PROMPT = "Create A Course On The Following Details with field Course Name, Description, along with Chapter Name, about, Duration:";
        const USER_INPUT_PROMPT = `Category: ${userCourseInput?.Category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}, in Json Format`;
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    
        // Simulating result from an API response
        const result = {
            response: JSON.stringify({ courseName: 'Sample Course', description: 'This is a sample course' })
        };
    
        // Parsing the response directly
        const courseLayout = JSON.parse(result.response);
    
        // Save the parsed layout to the database
        saveCourseLayoutToDb(courseLayout);
        setLoading(false);
    };
    

    // UseEffect to log the changes in userCourseInput for debugging
    useEffect(() => {
        console.log(userCourseInput);
    }, [userCourseInput]);

    return (
        <div>
            {/* Stepper */}
            <div className='justify-center items-center mt-10 flex flex-col'>
                <h2 className="text-4xl text-purple-500 font-medium">Create Course</h2>
                <div className='flex mt-10'>
                    {StepperOptions.map((item, index) => (
                        <div className='flex items-center' key={item.id}>
                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && 'bg-primary'}`}>
                                    {item.icon}
                                </div>
                                <h2 className='hidden md:block md:text-sm'>
                                    {item.name}
                                </h2>
                            </div>
                            {index !== StepperOptions.length - 1 && (
                                <div className='h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-400' />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Component for Category, Topic, and Options */}
            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {activeIndex === 0 ? (
                    <Category onSelect={handleCategorySelect} />
                ) : activeIndex === 1 ? (
                    <TopicDescription />
                ) : (
                    <SelectOption />
                )}

                {/* Next and Previous Buttons */}
                <div className='flex justify-between mt-10'>
                    <Button
                        disabled={checkStatus()}
                        onClick={() => setActiveIndex(activeIndex + 1)}
                    >
                        Next
                    </Button>
                    {activeIndex === 2 && (
                        <Button onClick={GenerateCourseLayout}>
                            Generate Course Layout
                        </Button>
                    )}
                    <Button
                        disabled={activeIndex === 0}
                        variant='outline'
                        onClick={() => setActiveIndex(activeIndex - 1)}
                    >
                        Previous
                    </Button>
                </div>
            </div>
            <div>
                <LodingDialogue loading={loading} />
            </div>
        </div>
    );
}

export default CreateCourse;
