import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useAxios = (url: string, method = 'get', options = {}) => {
  const [data, setData] = useState<any[] | any>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
    try {
      const response = await axios(url, {
        method,
        ...options,
      });
      console.log(response.data.data, ': axios called');
      setData(response.data.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isLoading };
};

export default useAxios;
