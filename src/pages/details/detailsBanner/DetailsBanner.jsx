import React from 'react'
import './detailsbanner.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../../utils/useFetch';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper'
import Image from '../../../components/lazyload/Image';
import { useSelector } from 'react-redux';
import noPoster from '../../../assets/no-poster.png';
import dayjs from 'dayjs';
import Ratings from '../../../components/ratings/Ratings';
import {AiOutlinePlayCircle} from 'react-icons/ai';

const DetailsBanner = () => {

    const {mediaType,id} = useParams();
    const {data,loading} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector(state => state.home);

    return (
        <div className="detailsBanner">
            {!loading ? (
                <div>
                    <div className="backdrop-img">
                        <Image src={url.backdrop+data?.backdrop_path}/>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper >
                        <div className="left">
                            {data?.poster_path? (
                                <Image className='posterImg' src={url.backdrop + data?.poster_path}/>
                            ) :(
                                <Image className='posterImg' src={noPoster}/>
                            )}
                        </div>
                        <div className="right">
                            <div className="title">
                                {`${data?.name || data?.title} (${dayjs(data?.realse_date).format("YYYY")})`}
                            </div>
                            <div className="subtitle">
                                {data?.tagline}
                            </div>
                            <div className="row">
                                <Ratings rating={data?.vote_average.toFixed(1)}/>
                                <div className="playbtn">
                                    <AiOutlinePlayCircle className='playIcon'/>
                                    <span className='text'>Play Trailor</span>
                                </div>
                            </div>
                            <div className="overview">
                                <div className="heading"> OverView</div>
                                <div className="description">
                                    {data?.overview}
                                </div>
                            </div>
                            <div className="info">
                                {data?.status && (
                                    <div className="infoitem">
                                        <span className="text bold">
                                            Status:{" "}
                                        </span>
                                        <span className="text">
                                            {data.status}
                                        </span>

                                    </div>
                                )}
                                {(data?.release_date ||  data?.first_air_date )&& (
                                    <div className="infoitem">
                                        <span className="text bold">
                                            Release Date:{" "}
                                        </span>
                                        <span className="text">
                                            {dayjs(data.release_date || data.first_air_date)
                                            .format("MMM D, YYYY")}
                                        </span>

                                    </div>
                                )}
                                {(data?.runtime || data?.episode_run_time) && (
                                    <div className="infoitem">
                                        <span className="text bold">
                                            Runtime:{" "}
                                        </span>
                                        <span className="text">
                                            {`${data.runtime ||data.episode_run_time[0]} mins`}
                                        </span>

                                    </div>
                                )}
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );

}

export default DetailsBanner