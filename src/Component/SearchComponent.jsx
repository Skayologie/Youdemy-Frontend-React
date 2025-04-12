import { useState , useEffect } from "react";
import CardCourse from "./Card";
import { SearchBar } from "./Form";
import axios from "axios";
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

export default function searchComponent(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);


    const apiUrl = import.meta.env.VITE_URL_API;

    useEffect(() => {
            const fetchData = async () => {
            const res = await axios.get(`${apiUrl}/courses?search=${query}`);
            setResults(res.data.courses);
            console.log(res.data.courses)
        };
            if (query.length > 0) {
            fetchData();
            
        }
        
      }, [query]);
      
    if(document.getElementById("WhereForSearch") != null){
        const root = ReactDOM.createRoot(document.getElementById('WhereForSearch'));

        root.render(
            results.length === 0 ? <p>Loading...</p> : (
                results.map((course) => (
                <CardCourse key={course.id} title={course.title} description={course.description} />
                ))
            ),
            document.getElementById("WhereForSearch")
        );
        }
    
      
    return (
        <>
            <SearchBar changeF={(e)=>{setQuery(e.target.value)}} where="WhereForSearch"  />
        </>
    );
}