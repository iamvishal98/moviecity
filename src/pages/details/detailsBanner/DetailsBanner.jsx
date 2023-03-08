import React, { useState } from 'react'
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
import Popup from '../../../components/popup/Popup';
import DetailsBannerSkeleton from './detailsbannerskeleton/DetailsBannerSkeleton';

const DetailsBanner = ({video,crew}) => {

    const [show,setShow] = useState(false);
    const [videoId,setVideoId] = useState(null);

    const {mediaType,id} = useParams();
    const {data,loading} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector(state => state.home);
    const director = crew?.filter((f) => (f?.job === 'Director' ));
    const people = crew?.filter((f) => f.job === 'Screenplay' || f.job === 'Story' ||f.job === 'Writer');

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
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
                                <div className="playbtn" 
                                onClick={() => {setShow(true); setVideoId(video?.key)}}
                                >
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
                            {director?.length >0 &&(
                                <div className="info">
                                    <span className="text bold">
                                        Director:{" "}
                                    </span>
                                    <span className="text">
                                        {director.map((d,i) => (
                                            <span key={i}>
                                                {d.name}
                                                {director.length -1 !== i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )
                            }
                            {people?.length >0 &&(
                                <div className="info">
                                    <span className="text bold">
                                        Writer:{" "}
                                    </span>
                                    <span className="text">
                                        {people.map((d,i) => (
                                            <span key={i}>
                                                {d.name}
                                                {people.length -1 !== i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )
                            }
                            {data?.created_by?.length >0 &&(
                                <div className="info">
                                    <span className="text bold">
                                        Creator:{" "}
                                    </span>
                                    <span className="text">
                                        {data?.created_by.map((d,i) => (
                                            <span key={i}>
                                                {d.name}
                                                {data?.created_by?.length -1 !== i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )
                            }
                        </div>
                    </ContentWrapper>
                    <Popup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                </>
            ) : (
                <div className="detailsBanner">
                    <ContentWrapper>
                        <DetailsBannerSkeleton />
                    </ContentWrapper>
                </div>
            )}
        </div>
    );

}

export default DetailsBanner