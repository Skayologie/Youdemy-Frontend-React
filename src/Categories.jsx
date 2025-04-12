import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'
import { Share2, Heart, ShoppingBag, Edit, X, Delete, Trash } from 'lucide-react';

function Categories() {
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_URL_API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl+"/Categories");
        const fetchedData = Array.isArray(response.data) ? response.data : response.data.data;
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const { id } = useParams(); 

  const DeleteHandling = async () => {
    try {

      const response = await axios.delete(`${apiUrl}/Categories/${id}`);
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const columns = [
    { field: 'categorieName', headerName: 'Category Name', width: 500 },
  ];

  const formattedData = data.map((item, index) => ({
    id: item.id || index,
    ...item
  }));

  return (
    <div>
      <div className='p-5 flex justify-between items-center'>
        <strong className='text-2xl '>Categories</strong>
        <Link to={"/CreateCategory"}>
          <Button variant="contained" >
            Create +
          </Button>
        </Link>                
        
      </div>
      <div className='flex justify-center flex-wrap gap-5 mt-4'>
        {data.length === 0 ? (
          <p>Loading...</p>
          
        ) : (
          <Paper sx={{ height: 400, width: '80%' }}>
            <DataGrid
              rows={formattedData}
              columns={columns}
              sx={{ border: 0 }}
            />
          </Paper>
        )}
      </div>
    </div>
  );
}

export default Categories;
