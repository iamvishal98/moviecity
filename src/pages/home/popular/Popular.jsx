import React, { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchButton from '../../../components/switchButton/SwitchButton';
import useFetch from '../../../utils/useFetch';


const Popular = () => {
    const [type,setType] = useState("movie");
    const handleSwitch = (window) => {
        setType(window)
    };
    const {data,loading} = useFetch(`/${type}/popular`);

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carousalTitle">Whats Popular</span>
            <SwitchButton data={["movie","tv"]} handleSwitch={handleSwitch}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={type} />
    </div>
  )
}

export default Popular