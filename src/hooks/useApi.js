import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useApi;
