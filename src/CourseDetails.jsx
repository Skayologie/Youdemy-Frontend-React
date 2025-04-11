import React from 'react'
import { useParams } from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from "axios";
import SingleCourse from "./Component/SingleCourse"
function CourseDetails() {
    const { id } = useParams();
    const [data, setData] = useState([]);
        useEffect(() => {
        const fetchData = async () => {
                try {
                    const response = await axios.get("http://127.0.0.1:4848/api/V1/Courses/"+id);
                    setData(Array.isArray(response.data) ? response.data : response.data.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }, []);
        if(data.length > 0){
            console.log(data)
            return (
                <div>
                    <SingleCourse 
                        title={data[0].title}
                        content={data[0].content}
                        category={data[0].category}
                        description={data[0].description}
                    />
                    
                </div>
            )
        }
}

export default CourseDetails