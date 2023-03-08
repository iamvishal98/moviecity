import React from 'react';
import ContentWrapper from '../../contentwrapper/ContentWrapper';
import '../herobanner.scss';

const BannerSkeleton = () => {
    return (
        <>
            <div className="backdrop_image skeleton"></div>
            <div className="opacity_layer"></div>
        
            <ContentWrapper>
                <div className="content skeleton">
                    <span className="title skeleton"></span>
                    <span className='subtitle skeleton'></span>
                </div>
            </ContentWrapper>
        </>
      )
}

export default BannerSkeleton