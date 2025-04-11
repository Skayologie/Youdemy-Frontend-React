import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        // Handle data shape (in case of { data: [...] } or just [...])
        // const result = Array.isArray(response.data) ? response.data[0] : response.data.data[0];
        const result = response.data;
        setData(Array.isArray(result) ? result[0] : result.data[0]);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log(data)
  }, []);

  return { data, loading, error };
};

export default useFetch;
