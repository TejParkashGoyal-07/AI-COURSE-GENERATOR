import React, { useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Input } from "../../../components/ui/Input"
import { UserInputContext } from '../../_context/UserInputContext'
function SelectOption() {

  const { UserCourseInput, setUserCourseInput } = useContext(UserInputContext)
  const onInputChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }
  return (
    <div className='px-10 md:px-44'>
      <div className='grid grid-cols-2 gap-10'>
        <div>
          <label className='text-sm'>Difficulty Level</label>
          <Select defaultValue={UserCourseInput?.level}onValueChange={(value)=>onInputChange('Level',value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Course Duration */}
        <div>
          <label className='text-sm'>Course Duration</label>
          <Select onValueChange={(value)=>onInputChange('duration',value)}defaultValue={UserCourseInput?.duration}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value=" More Than 3 Hours">3 or More Than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Display Video */}
        <div>
          <label className='text-sm'>Add Video</label>
          <Select onValueChange={(value)=>onInputChange('displayVideo',value)}defaultValue={UserCourseInput?.displayVideo}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">YES</SelectItem>
              <SelectItem value="2 Hours">NO</SelectItem>

            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='text-sm'>Number Of Chapters</label>
          <Input type="Number" className='h-14 text-lg'defaultValue={UserCourseInput?.noOfChapters}
          onChange={(event)=>onInputChange('noOfChapters',event.target.value)}
          />
        </div>

      </div>
    </div>
  )
}

export default SelectOption
