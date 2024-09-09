import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiOutlinePencilAlt } from "react-icons/hi";
import {Textarea} from "../../../../components/ui/textarea"
import {db} from "../../../../@/configs/db"
import { CourseList } from '../../../../configs/schema';
import { eq} from 'drizzle-orm';
import { Input } from 'postcss';
function EditCourse({course,refreshData}) {
    const [name,setName]=useState()
    const [description,setDescription]=useState()
    const onUpdateHandler=async()=>{
        course.courseOutput.course.name=name;
        course.courseOutput.course.description=description
        const result=await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id))
        .returning({id:CourseList.id})

        refreshData(true)
    }
    useEffect(()=>{
        setName(course?.courseOutput?.course.name)
        setDescription(course?.courseOutput?.course?.description)
    })
    return (
            
            <Dialog>
                <DialogTrigger><HiOutlinePencilAlt /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Course Title & Description</DialogTitle>
                        <DialogDescription>
                            <div className='mt-3'>
                                <label htmlFor="">Course Title</label>
                                <Input defaultValue={course?.courseOutput?.course?.name}
                                onChange={(event)=>setName(event?.target.value)}
                                ></Input>
                            </div>
                            <div>
                                <label htmlFor="">Descrition</label>
                                <Textarea  
                                className='h-40' 
                                defaultValue={course?.courseOutput?.course?.description} onChange={(event)=>setDescription(event?.target.value)}></Textarea>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button onClick={onUpdateHandler}>Update</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        
    )
}

export default EditCourse
