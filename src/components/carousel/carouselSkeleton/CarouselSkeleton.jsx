import React from 'react';
import './carouselSkeleton.scss';

const CarouselSkeleton = () => {
    return (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    )
}

export default CarouselSkeleton