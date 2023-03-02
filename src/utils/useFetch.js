import axios from 'axios';
import  { useEffect, useState } from 'react'
import { BASE_URL,headers } from './api';

const useFetch = (url,params) => {
    const [data, setData] = useState(null)
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(null);

    const fetchData =  async(url,params) => {
        try{
            const {data} = await axios.get(BASE_URL + url,{
                headers,
                params
            });
            setData(data);
            setLoading(false);
         
        }catch(er) {
            setError(er);
            setLoading(false);
        }
        
    } ;

    useEffect(() => {
        setLoading('loading...')
        fetchData(url,params);
    },[url]);

  return {data,error,loading};
}

export default useFetch