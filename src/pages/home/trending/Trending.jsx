import React, { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchButton from '../../../components/switchButton/SwitchButton';
import useFetch from '../../../utils/useFetch';


const Trending = () => {
    const [timeWindow,setTimeWindow] = useState("day");
    const handleSwitch = (window) => {
        setTimeWindow(window)
    };
    const {data,loading} = useFetch(`/trending/all/${timeWindow}`);

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carousalTitle">Trending</span>
            <SwitchButton data={["day","week"]} handleSwitch={handleSwitch} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={timeWindow}/>
    </div>
  )
}

export default Trending