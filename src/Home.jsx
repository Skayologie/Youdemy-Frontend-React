import React from 'react'
import axios from "axios";
import { useState , useEffect } from 'react'
import CardCourse from "../src/Component/Card";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
function Home() {
    const [data, setData] = useState([]);
    const apiUrl = import.meta.env.VITE_URL_API

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get(`${apiUrl}/Courses`);
        setData(Array.isArray(response.data) ? response.data : response.data.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    fetchData();
    }, []);

  return (
    <div>
      <div className='p-5 flex justify-between items-center'>
        <strong className='text-2xl '>Courses</strong>
        <Link to={"/CreatePost"}>
          <Button variant="contained" >
            Create +
          </Button>
        </Link>
      </div>
      <div className='flex justify-center flex-wrap gap-5'>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((course) => (
          <Link to={"/Course/"+course.courseId}>
            <CardCourse title={course.title} description={course.description} />
          </Link>
        ))
      )}
    </div>
    </div>
  )
}

export default Home