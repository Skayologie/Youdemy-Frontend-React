import React from 'react';

import { useEffect, useState } from 'react'
import axios from "axios";
const apiUrl = import.meta.env.VITE_URL_API


export default function InputS({Label,Type,id,name,placeholder="",change}) {
  return (
    <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">{Label}</label>
        <input onChange={change} name={name} style={{"color":"black"}} type={Type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
  );
}

export function TextAreaS({Label,id,name,placeholder="",change}) {
    return (
      <div className="mb-5">
        <label  className="block mb-2 text-sm font-medium text-gray-900 ">{Label}</label>
        <textarea onChange={change} id={id} name={name} rows="4" style={{"color":"black"}} className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}></textarea>
      </div>
    );
  }

export function SelectOption({Label,id,name,placeholder="",change}) {
    const [data,setData] = useState();
    useEffect(()=>{
            const GetCategories = async () =>{
                const response = await axios.get(`${apiUrl}/Categories`);
                setData(Array.isArray(response.data) ? response.data : response.data.data);
            }
            
            GetCategories()
        },[])

    if(data){
        return (
            <>
                <div className="mb-5">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">{Label}</label>
                        <select onChange={change} name={name} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option defaultValue>{placeholder}</option>
                            {data.map(element => (
                                <option key={element.categorieID} value={element.categorieID}>{element.categorieName}</option>
                            ))}
                        </select>
                </div>
            </>
        );
    }
  }
