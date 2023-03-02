import React from 'react';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchButton from '../../../components/switchButton/SwitchButton';


const Trending = () => {
    const handleSwitch = () => {};

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carousalTitle">Trending</span>
            <SwitchButton data={["day","week"]} handleSwitch={handleSwitch}/>
        </ContentWrapper>
    </div>
  )
}

export default Trending