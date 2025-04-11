import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Categories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4848/api/V1/Categories");
        const fetchedData = Array.isArray(response.data) ? response.data : response.data.data;
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'categorieName', headerName: 'Category Name', width: 200 },
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
