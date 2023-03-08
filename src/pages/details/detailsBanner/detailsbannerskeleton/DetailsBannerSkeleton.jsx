import React from 'react';
import ContentWrapper from '../../../../components/contentwrapper/ContentWrapper';
import './detailsbannerskeleton.scss';


const DetailsBannerSkeleton = () => {
  return (
    <>
        <div className="leftContainer skeleton"></div>
        <div className="rightContainer">
            <div className="rowDetails skeleton"></div>
            <div className="rowDetails skeleton"></div>
            <div className="rowDetails skeleton"></div>
            <div className="rowDetails skeleton"></div>
            <div className="rowDetails skeleton"></div>
            <div className="rowDetails skeleton"></div>
            <div className="rowDetails skeleton"></div>
        </div>
   </>
  )
}

export default DetailsBannerSkeleton

