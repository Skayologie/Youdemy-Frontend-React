import React, { useEffect, useState } from 'react'
import InputS, { SelectOption, TextAreaS } from './Component/Form'
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function CreateCategory() {
    const [title,setTitle] = useState();
    const apiUrl = import.meta.env.VITE_URL_API

    const navigate = useNavigate();
    const HandleCourseCreate = async () =>{
        try {
            const payload = {
                name : title,
            }
            const response = await axios.post(`${apiUrl}/Categories`, payload);
            console.log("✅ Success:", response);
            toast.success(response.data.message)
            navigate('/Categories');
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    
    return (
           <>
            <div className='p-5 flex justify-between items-center'>
                    <strong className='text-2xl '>Create Category</strong>
            </div>
            <div className="max-w-sm mx-auto">
                
                <InputS change={(e)=>{setTitle(e.target.value)}} id={'Title'} name={'name'} Label="name" placeholder='The title'></InputS>
                
                <button type='submit' onClick={HandleCourseCreate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
           </>
    )
}

export default CreateCategory