import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../utils/useFetch';
import Cast from './cast/Cast';
import './details.scss';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Recommendations from './detailscarousel/Recommendations';
import Similar from './detailscarousel/Similar';
import VideoCarousel from './videoCarousel/VideoCarousel';

const Details = () => {
  
  const {mediaType,id} = useParams()
  const {data,loading} =  useFetch(`/${mediaType}/${id}/videos`);
  const {data : credits,loading: creditsLoading} =  useFetch(`/${mediaType}/${id}/credits`);
  if(window.origin === window.location.href){
    console.log("hi")
  }

  return (
    <div>
      <DetailsBanner video={data?.results?.[1]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoCarousel data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details