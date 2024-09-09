import React, { useContext } from 'react'
import { UserInputContext } from '../../_context/UserInputContext'
import { Input } from '../../../components/ui/Input'
import { Textarea } from '../../../components/ui/textarea'
function TopicDescription() {
  const{UserCourseInput,setUserCourseInput}=useContext(UserInputContext)
  const onInputChange=(fieldName,value)=>{
    setUserCourseInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div className='mx-20 lg:mx-44'>
      {/* InputTopic */}
        <div>
            <div className='mt-5'>
                <label>Write A Topic You Want To Generate The Course e.g.(Python,Yoga Etc)
                    <Input placeholder={'Topic'} className='h-14 text-xl'onChange={(e)=>onInputChange('topic',e.target.value)} defaultValue={UserCourseInput?.topic}></Input>
                </label>
            </div>
            <div className='mt-5'>
                <label>Tell us About Your Course,What You Are Including(optional)</label>
                <Textarea placeholder='About Your Course' className='h-24 text-xl' onChange={(e)=>onInputChange('description',e.target.value)}defaultValue={UserCourseInput?.description}></Textarea>
            </div>
        </div>
      {/* {Text Area Desc} */}
    </div>
  )
}

export default TopicDescription
