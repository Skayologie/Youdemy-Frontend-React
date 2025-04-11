import React, { useEffect, useState } from 'react'
import InputS, { SelectOption, TextAreaS } from './Component/Form'
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function CreateCourse() {
    const [title,setTitle] = useState();
    const [description,setDescription] = useState();
    const [content,setContent] = useState();
    const [category,setCategory] = useState();
    const navigate = useNavigate();
    const HandleCourseCreate = async () =>{
        try {
            const payload = {
                title : title,
                description : description,
                content : content,
                category_id : category,
            }
            const response = await axios.post("http://127.0.0.1:4848/api/V1/Courses", payload);
            console.log("✅ Success:", response);
            toast.success(response.data.message)
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    
    return (
           <>
            <div className='p-5 flex justify-between items-center'>
                    <strong className='text-2xl '>Create Your Own Course</strong>
            </div>
            <div className="max-w-sm mx-auto">
                
                <InputS change={(e)=>{setTitle(e.target.value)}} id={'Title'} name={'title'} Label="title" placeholder='The title'></InputS>
                <TextAreaS change={(e)=>{setDescription(e.target.value)}}  name={'description'} Label="description" placeholder='The Description'></TextAreaS>
                <TextAreaS change={(e)=>{setContent(e.target.value)}}  name={'content'} Label="content" placeholder='The Content'></TextAreaS>
                <SelectOption  change={(e)=>{setCategory(e.target.value)}} name={'category_id'} Label="category" placeholder='Choose The Category'></SelectOption>

                <button type='submit' onClick={HandleCourseCreate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
           </>
    )
}

export default CreateCourse