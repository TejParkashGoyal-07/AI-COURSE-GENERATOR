import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from 'postcss';
import {db} from "../../../../@/configs/db"
import { CourseList } from '../../../../configs/schema';
import { Textarea } from "../../../../components/ui/textarea"
import { HiOutlinePencilAlt } from "react-icons/hi";
function EditChapters({ course, index,refreshData }) {
  const Chapters = course?.courseOutput?.course?.chapters;
  const [name, setName] = useState([]);
  const [about, setAbout] = useState()
  useEffect(() => {
    setName(Chapters[index].name)
    setAbout(Chapters[index].about)
  }, [course])

  const onUpdateHandler = async() => {
    course.courseOutput.course.chapters[index].name = name;
    course.courseOutput.course.chapters[index].about = about;
    const result = await db.update(CourseList).set({
      courseOutput: course?.courseOutput
    }).where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id })
      refreshData(true)
  }
  return (
    <Dialog>
      <DialogTrigger><HiOutlinePencilAlt /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className='mt-3'>
              <label htmlFor="">Course Title</label>
              <Input defaultValue={Chapters[index].name}
                onChange={(event) => setName(event?.target.value)}
              ></Input>
            </div>
            <div>
              <label htmlFor="">Descrition</label>
              <Textarea
                className='h-40'
                defaultValue={Chapters[index].about}
                onChange={(event) => setAbout(event?.target.value)}></Textarea>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter >
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default EditChapters