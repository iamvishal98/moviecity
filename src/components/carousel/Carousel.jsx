import React, { useRef, useState } from "react";
import './carousel.scss';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentwrapper/ContentWrapper";
import Image from "../lazyload/Image";
import PosterFallback from "../../assets/no-poster.png";
import Ratings from "../ratings/Ratings";
import CarouselSkeleton from "./carouselSkeleton/CarouselSkeleton";

const Carousel = ({data,loading,endPoint,title}) => {

    const carouselRef = useRef();
    const {url} = useSelector(state => state.home);
    const navigate = useNavigate();
    const [currentSlide,setCurrentSlide] = useState(1);

    const maxSlides=Math.floor
            (carouselRef?.current?.offsetWidth/carouselRef?.current?.firstChild?.offsetWidth);

    const scrollToLeft = () => {
        const target = carouselRef.current;
        if(currentSlide <=1) 
        { setCurrentSlide(maxSlides)
            target.scroll({
                left:target.scrollLeft + ((target.offsetWidth + 20)*currentSlide),
            })
        }
        else {
            setCurrentSlide(currentSlide-1)
            target.scroll({
                left:target.scrollLeft - (target.offsetWidth + 20),
            })
        }
    };

    const scrollToRight = () => {
        const target = carouselRef.current;
        if(currentSlide === maxSlides) {
            setCurrentSlide(1)
            target.scroll({
                left:target.scrollLeft - ((target.offsetWidth + 20)*currentSlide),
            })
        }else {
            setCurrentSlide(currentSlide+1);
            target.scroll({
                left:target.scrollLeft + (target.offsetWidth + 20),
            })
        }
    };

  return (
    <div className="carousel">
        <ContentWrapper>
            <BsFillArrowLeftCircleFill 
                className="arrowLeft arrow"
                onClick={() => scrollToLeft()}
            />
            <BsFillArrowRightCircleFill 
                className="arrowRight arrow"
                onClick={() => scrollToRight()}
            />
            {data?.length>0 && <div className="carouselTitle">{title}</div>}
            {!loading ? 
                <div className="carouselItems" ref={carouselRef} >
                    {data?.map((item) => {
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                        return (
                            <div key={item.id} 
                                className="carouselItem" 
                                onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}
                            >
                                <div className="posterBlock">
                                    <Image src={posterUrl} />
                                    <Ratings rating={item.vote_average.toFixed(1)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.realse_dat).format("MMM D,YYYY")}
                                    </span>
                                </div>

                            </div>
                        )
                    })}

                </div>
            
            : 
            <div className="loadingSkeleton">
                <CarouselSkeleton />
                <CarouselSkeleton />
                <CarouselSkeleton />
                <CarouselSkeleton />
            </div>
            }
        </ContentWrapper>
    </div>
  )
}

export default Carousel