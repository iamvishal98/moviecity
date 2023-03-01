import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getApiConfigurations } from '../store/slicer/HomeSlice';
import { BASE_URL,headers } from './api';

const useFetch = (url,params) => {
    const [error,setError]=useState('');
    const dispatch = useDispatch();

    const fetchData =  async(url,params) => {
        try{
            const response = await axios.get(BASE_URL + url,{
                headers,
                params
            });
            dispatch(getApiConfigurations(response.data));
        }catch(er) {
            setError(er);
        }
        
    } ;

    useEffect(() => {
        fetchData(url,params);
    },[])

  return [error];
}

export default useFetch