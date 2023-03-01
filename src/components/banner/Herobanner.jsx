import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../utils/useFetch';
import './herobanner.scss';

import Image from '../lazyload/Image';
import ContentWrapper from '../contentwrapper/ContentWrapper';

const Herobanner = () => {

    const [background,setBackground] =useState('');
    const [query , setQuery] = useState('');
    const navigate = useNavigate();
    const {data,loading} = useFetch('/movie/upcoming');
    const {url} = useSelector(state => state.home);

    const searchQueryHandler = (event) => {
        if(event.key === "Enter" && query.length >0){
            navigate(`/search/${query}`)
        }
    };

    useEffect(() => {
        const bgImg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bgImg);
    },[data])


  return (
    <div className='banner_container'>
       {!loading && <div className="backdrop_image">
            <Image src={background} />
        </div>}

        <div className="opacity_layer"></div>

        <ContentWrapper>
            <div className="content">
                <span className="title">Welcome.</span>
                <span className='subtitle'>Millions of movies, TV shows to discover on your fingertips.</span>
                <div className="searchInput">
                    <input 
                        type='text' 
                        placeholder='search for movie or tv show' 
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                    <button>search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default Herobanner